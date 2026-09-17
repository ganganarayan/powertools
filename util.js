'use strict';

/**
 * Small dependency-free helpers for analytics: UA classification, referrer host,
 * IP hashing (privacy — we never store a raw IP), and safe truncation.
 */

const crypto = require('crypto');

function truncate(s, n) {
  if (s === null || s === undefined) return null;
  s = String(s);
  return s.length > n ? s.slice(0, n) : s;
}

function parseUa(ua) {
  ua = ua || '';
  let device = 'desktop';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) device = 'tablet';
  else if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|IEMobile/i.test(ua)) device = 'mobile';

  let browser = 'Other';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/OPR\/|Opera/i.test(ua)) browser = 'Opera';
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';

  let os = 'Other';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Mac OS X|Macintosh/i.test(ua)) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  return { device: device, browser: browser, os: os };
}

function hostOf(url) {
  try {
    if (!url) return null;
    return new URL(url).hostname.replace(/^www\./, '');
  } catch (e) {
    return null;
  }
}

function hashIp(ip, salt) {
  if (!ip) return null;
  return crypto.createHash('sha256').update((salt || 'ptc') + String(ip)).digest('hex').slice(0, 16);
}

module.exports = { truncate, parseUa, hostOf, hashIp };
