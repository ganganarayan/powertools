'use strict';

const path = require('path');
const express = require('express');
const { tools, policies, contact, site } = require('./data/site');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets (styles.css, images, etc.)
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

// Shared locals available to every view
const base = { tools, policies, contact, site };

// Home
app.get('/', (req, res) => {
  res.render('index', Object.assign({}, base, {
    page: 'home',
    title: "Power Tools for Coaches — 6 tools that do what the popular apps can't",
    description: 'Assess360, A Video Router, VidaPulse, LeadEngine, CloudBridge and Pulse Email — a suite of power tools built for coaches. Free to start.'
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
