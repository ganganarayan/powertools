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

// Static assets (styles.css, images, etc.)
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

// Shared locals available to every view
const base = { tools, policies, contact, site };

// Home
app.get('/', (req, res) => {
  res.render('index', Object.assign({}, base, {
    page: 'home',
    title: "Power Tools for Coaches — 6 tools that do what the popular apps can't",
    description: 'Assess360, A Video Router, VidaPulse, Revenue OS, Cloudz Copy and AI Gita Mentor — a suite of power tools built for coaches. Free to start.'
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

function adminAuth(req, res, next) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) {
    return res.status(503).type('text/plain')
      .send('Admin not configured. Set the ADMIN_PASSWORD environment variable to enable /admin.');
  }
  const user = process.env.ADMIN_USER || 'admin';
  const m = /^Basic (.+)$/.exec(req.headers.authorization || '');
  if (m) {
    const decoded = Buffer.from(m[1], 'base64').toString();
    const idx = decoded.indexOf(':');
    const u = decoded.slice(0, idx);
    const p = decoded.slice(idx + 1);
    if (u === user && safeEqual(p, pass)) return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Power Tools Admin", charset="UTF-8"')
    .status(401).type('text/plain').send('Authentication required.');
}

app.get('/admin', adminAuth, (req, res) => {
  const allowed = { '1': 1, '7': 7, '30': 30, '0': 0 };
  const key = Object.prototype.hasOwnProperty.call(allowed, String(req.query.days)) ? String(req.query.days) : '7';
  const days = allowed[key];
  const since = days > 0 ? Date.now() - days * 86400000 : 0;
  res.render('admin', Object.assign({}, base, {
    page: 'admin',
    title: 'Analytics — Power Tools for Coaches',
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
    title: 'Page not found — Power Tools for Coaches',
    description: 'The page you were looking for does not exist.'
  }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Power Tools for Coaches running on port ' + port);
});

module.exports = app;
