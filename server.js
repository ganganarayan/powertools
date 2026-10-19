'use strict';

const path = require('path');
const crypto = require('crypto');
const express = require('express');
const { tools, policies, contact, site } = require('./data/site');
const db = require('./db');
const util = require('./util');

const app = express();

// Behind Railway's proxy — needed for a correct client IP.
app.set('trust proxy', true);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Small JSON body for the tracking beacon.
app.use(express.json({ limit: '32kb' }));
// Form body for the admin login POST.
app.use(express.urlencoded({ extended: false, limit: '16kb' }));

// Static assets (styles.css, images, etc.)
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

// Shared locals available to every view. metaPixelId is the SAME Meta pixel used by
// the Assess360 SaaS funnel — set META_PIXEL_ID on this service to fire PageView here.
const base = { tools, policies, contact, site, metaPixelId: process.env.META_PIXEL_ID || null };

// Home
app.get('/', (req, res) => {
  res.render('index', Object.assign({}, base, {
    page: 'home',
    title: "Power Tools for Business — 6 tools that do what the popular apps can't",
    description: 'Assess360, A Video Router, VidaPulse, Revenue OS, Cloudz Copy and AI Gita Mentor — a suite of power tools built for growing businesses. Free to start.'
  }));
});

// One route per tool -> shared tool template
tools.forEach((tool) => {
  app.get('/' + tool.slug, (req, res) => {
    res.render('tool', Object.assign({}, base, {
      page: 'tool',
      tool,
      title: tool.metaTitle,
      description: tool.metaDesc
    }));
  });
});

// One route per policy -> its own view under views/policies
policies.forEach((p) => {
  app.get('/' + p.slug, (req, res) => {
    res.render('policies/' + p.slug, Object.assign({}, base, {
      page: 'policy',
      pageTitle: p.title,
      title: p.metaTitle,
      description: p.metaDesc
    }));
  });
});

// --- Analytics ingest (first-party beacon) ---------------------------------
const TRACK_KINDS = new Set(['pageview', 'tool_click', 'cta_click', 'contact_click']);

app.post('/api/track', (req, res) => {
  try {
    const b = req.body || {};
    if (!TRACK_KINDS.has(b.kind)) return res.status(204).end();
    const ua = req.headers['user-agent'] || '';
    const p = util.parseUa(ua);
    const utm = b.utm || {};
    db.record({
      ts: Date.now(),
      session_id: util.truncate(b.sid, 64),
      kind: b.kind,
      path: util.truncate(b.path, 300) || '/',
      tool: util.truncate(b.tool, 64) || null,
      referrer: util.truncate(b.ref, 400) || null,
      referrer_host: util.hostOf(b.ref),
      utm_source: util.truncate(utm.source, 120) || null,
      utm_medium: util.truncate(utm.medium, 120) || null,
      utm_campaign: util.truncate(utm.campaign, 160) || null,
      utm_term: util.truncate(utm.term, 160) || null,
      utm_content: util.truncate(utm.content, 160) || null,
      device: p.device,
      browser: p.browser,
      os: p.os,
      ua: util.truncate(ua, 400),
      ip_hash: util.hashIp(req.ip, process.env.ANALYTICS_SALT),
      is_new_session: b.isNew ? 1 : 0
    });
  } catch (e) { /* never fail the beacon */ }
  res.status(204).end();
});

// --- Admin dashboard (HTTP Basic auth via ADMIN_PASSWORD) -------------------
function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

// Cookie-based admin session (a normal login form, not the browser's Basic-auth
// popup). The cookie holds an HMAC of a fixed marker keyed by the admin secret, so
// it can't be forged without the secret and needs no server-side store.
const ADMIN_COOKIE = 'pt_admin';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';

function adminToken() {
  return crypto.createHmac('sha256', SESSION_SECRET).update('pt-admin-v1').digest('hex');
}

function parseCookies(req) {
  const out = {};
  const raw = req.headers.cookie;
  if (!raw) return out;
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function isAdmin(req) {
  if (!SESSION_SECRET) return false;
  const tok = parseCookies(req)[ADMIN_COOKIE];
  return !!tok && safeEqual(tok, adminToken());
}

// Login form (normal HTML page).
app.get('/admin/login', (req, res) => {
  if (isAdmin(req)) return res.redirect('/admin');
  res.render('admin-login', Object.assign({}, base, {
    page: 'admin',
    title: 'Sign in — Power Tools Admin',
    description: 'Admin sign in',
    error: null,
    configured: !!process.env.ADMIN_PASSWORD
  }));
});

app.post('/admin/login', (req, res) => {
  const pass = process.env.ADMIN_PASSWORD;
  const user = process.env.ADMIN_USER || 'admin';
  const u = (req.body && req.body.username) || '';
  const p = (req.body && req.body.password) || '';
  const render = (error) => res.status(401).render('admin-login', Object.assign({}, base, {
    page: 'admin', title: 'Sign in — Power Tools Admin', description: 'Admin sign in',
    error, configured: !!pass
  }));
  if (!pass) return render('Admin is not configured yet. Set the ADMIN_PASSWORD environment variable.');
  if (u === user && safeEqual(p, pass)) {
    res.cookie(ADMIN_COOKIE, adminToken(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 86400000
    });
    return res.redirect('/admin');
  }
  return render('Incorrect username or password.');
});

app.post('/admin/logout', (req, res) => {
  res.clearCookie(ADMIN_COOKIE);
  res.redirect('/admin/login');
});

app.get('/admin', (req, res) => {
  if (!isAdmin(req)) return res.redirect('/admin/login');
  const allowed = { '1': 1, '7': 7, '30': 30, '0': 0 };
  const key = Object.prototype.hasOwnProperty.call(allowed, String(req.query.days)) ? String(req.query.days) : '7';
  const days = allowed[key];
  const since = days > 0 ? Date.now() - days * 86400000 : 0;
  res.render('admin', Object.assign({}, base, {
    page: 'admin',
    title: 'Analytics — Power Tools for Business',
    description: 'Admin analytics',
    stats: db.getStats(since),
    ready: db.isReady(),
    days: days,
    ownHost: site.domain
  }));
});

// Simple health check for the platform
app.get('/healthz', (req, res) => res.type('text/plain').send('ok'));

// 404
app.use((req, res) => {
  res.status(404).render('404', Object.assign({}, base, {
    page: 'policy',
    pageTitle: 'Page not found',
    title: 'Page not found — Power Tools for Business',
    description: 'The page you were looking for does not exist.'
  }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Power Tools for Business running on port ' + port);
});

module.exports = app;
