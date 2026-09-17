'use strict';

/**
 * First-party analytics store (SQLite via better-sqlite3).
 *
 * Resilient by design: if the native module fails to load or the DB can't be
 * opened (e.g. the Railway volume isn't mounted yet), the module stays in a
 * "not ready" state — record() becomes a no-op and getStats() returns null —
 * so the marketing site keeps serving normally. Nothing here can crash boot.
 *
 * Storage location: DB_PATH env (point this at your mounted volume, e.g.
 * /data/analytics.db). Falls back to a local .data/ dir (ephemeral) if unset.
 */

const path = require('path');
const fs = require('fs');

let db = null;
let ready = false;
let initError = null;
let insertStmt = null;

function init() {
  try {
    const Database = require('better-sqlite3');
    const dbPath = process.env.DB_PATH
      || path.join(process.env.DATA_DIR || path.join(__dirname, '.data'), 'analytics.db');
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });

    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        ts            INTEGER NOT NULL,
        session_id    TEXT,
        kind          TEXT NOT NULL,
        path          TEXT,
        tool          TEXT,
        referrer      TEXT,
        referrer_host TEXT,
        utm_source    TEXT,
        utm_medium    TEXT,
        utm_campaign  TEXT,
        utm_term      TEXT,
        utm_content   TEXT,
        device        TEXT,
        browser       TEXT,
        os            TEXT,
        ua            TEXT,
        ip_hash       TEXT,
        is_new_session INTEGER DEFAULT 0
      );
      CREATE INDEX IF NOT EXISTS idx_events_ts      ON events(ts);
      CREATE INDEX IF NOT EXISTS idx_events_kind    ON events(kind);
      CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
    `);

    insertStmt = db.prepare(`INSERT INTO events
      (ts, session_id, kind, path, tool, referrer, referrer_host,
       utm_source, utm_medium, utm_campaign, utm_term, utm_content,
       device, browser, os, ua, ip_hash, is_new_session)
      VALUES
      (@ts, @session_id, @kind, @path, @tool, @referrer, @referrer_host,
       @utm_source, @utm_medium, @utm_campaign, @utm_term, @utm_content,
       @device, @browser, @os, @ua, @ip_hash, @is_new_session)`);

    ready = true;
    console.log('[analytics] storage ready at ' + dbPath);
  } catch (e) {
    initError = e;
    ready = false;
    console.error('[analytics] storage unavailable — tracking disabled:', e.message);
  }
}

init();

function isReady() { return ready; }

function record(ev) {
  if (!ready) return false;
  try {
    insertStmt.run(ev);
    return true;
  } catch (e) {
    console.error('[analytics] insert failed:', e.message);
    return false;
  }
}

function getStats(sinceTs) {
  if (!ready) return null;
  const since = sinceTs || 0;
  const many = (sql) => db.prepare(sql).all({ since });
  const one = (sql) => db.prepare(sql).get({ since });

  const kpis = one(`
    SELECT
      COALESCE(SUM(kind = 'pageview'), 0)                                        AS pageviews,
      COUNT(DISTINCT session_id)                                                 AS sessions,
      COALESCE(SUM(kind = 'tool_click'), 0)                                      AS tool_clicks,
      COUNT(DISTINCT CASE WHEN is_new_session = 1 THEN session_id END)           AS new_sessions
    FROM events WHERE ts >= @since`);

  const series = many(`
    SELECT strftime('%Y-%m-%d', ts / 1000, 'unixepoch') AS day,
           COALESCE(SUM(kind = 'pageview'), 0)          AS pageviews,
           COUNT(DISTINCT session_id)                    AS sessions
    FROM events WHERE ts >= @since
    GROUP BY day ORDER BY day`);

  const dim = (col) => many(`
    SELECT ${col} AS label, COUNT(*) AS n
    FROM events
    WHERE ts >= @since AND ${col} IS NOT NULL AND ${col} <> ''
    GROUP BY label ORDER BY n DESC LIMIT 12`);

  const pvDim = (col) => many(`
    SELECT COALESCE(NULLIF(${col}, ''), '(direct)') AS label, COUNT(*) AS n
    FROM events
    WHERE ts >= @since AND kind = 'pageview'
    GROUP BY label ORDER BY n DESC LIMIT 12`);

  const topPages = many(`
    SELECT COALESCE(NULLIF(path, ''), '/') AS label, COUNT(*) AS n
    FROM events WHERE ts >= @since AND kind = 'pageview'
    GROUP BY label ORDER BY n DESC LIMIT 12`);

  const referrers = many(`
    SELECT referrer_host AS label, COUNT(*) AS n
    FROM events
    WHERE ts >= @since AND referrer_host IS NOT NULL AND referrer_host <> ''
    GROUP BY label ORDER BY n DESC LIMIT 12`);

  const toolClicks = many(`
    SELECT COALESCE(NULLIF(tool, ''), '(unknown)') AS label, COUNT(*) AS n
    FROM events WHERE ts >= @since AND kind = 'tool_click'
    GROUP BY label ORDER BY n DESC LIMIT 20`);

  const devices = pvDim('device');
  const browsers = pvDim('browser');
  const os = pvDim('os');

  const recent = db.prepare(`
    SELECT ts, kind, path, tool, referrer_host,
           utm_source, utm_medium, utm_campaign, device, browser, os
    FROM events WHERE ts >= @since
    ORDER BY id DESC LIMIT 60`).all({ since });

  return {
    kpis: kpis,
    series: series,
    sources: dim('utm_source'),
    mediums: dim('utm_medium'),
    campaigns: dim('utm_campaign'),
    topPages: topPages,
    referrers: referrers,
    toolClicks: toolClicks,
    devices: devices,
    browsers: browsers,
    os: os,
    recent: recent
  };
}

module.exports = { isReady, record, getStats };
