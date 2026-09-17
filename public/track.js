/* First-party analytics beacon for powertools.divineleads.guru.
   Records a pageview + UTM/referrer on load, and tool click-throughs via
   [data-track] elements. Session id lives in localStorage (first-party only,
   no cookies). Fails silently and never blocks the page. */
(function () {
  'use strict';
  try {
    var SID_KEY = 'ptc_sid';
    var UTM_KEY = 'ptc_utm';

    var sid, isNew = 0;
    try { sid = localStorage.getItem(SID_KEY); } catch (e) {}
    if (!sid) {
      sid = Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      isNew = 1;
      try { localStorage.setItem(SID_KEY, sid); } catch (e) {}
    }

    var qs = new URLSearchParams(location.search);
    var getUtm = function (n) { return (qs.get('utm_' + n) || '').slice(0, 160); };

    // First-touch attribution: keep the UTM set from the first landing this session.
    var stored = {};
    try { stored = JSON.parse(sessionStorage.getItem(UTM_KEY) || '{}'); } catch (e) {}
    var utm = {
      source:   getUtm('source')   || stored.source   || '',
      medium:   getUtm('medium')   || stored.medium   || '',
      campaign: getUtm('campaign') || stored.campaign || '',
      term:     getUtm('term')     || stored.term     || '',
      content:  getUtm('content')  || stored.content  || ''
    };
    if (getUtm('source') || getUtm('medium') || getUtm('campaign')) {
      try { sessionStorage.setItem(UTM_KEY, JSON.stringify(utm)); } catch (e) {}
    }

    function send(kind, extra) {
      var body = {
        kind: kind,
        sid: sid,
        path: location.pathname,
        ref: document.referrer || '',
        isNew: isNew,
        utm: utm
      };
      if (extra) { for (var k in extra) body[k] = extra[k]; }
      var json = JSON.stringify(body);
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/track', new Blob([json], { type: 'application/json' }));
          return;
        }
      } catch (e) {}
      try {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: json,
          keepalive: true
        }).catch(function () {});
      } catch (e) {}
    }

    send('pageview');
    isNew = 0; // subsequent events in this session are not "new"

    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-track]') : null;
      if (!el) return;
      send(el.getAttribute('data-track') || 'click', { tool: el.getAttribute('data-tool') || '' });
    }, true);
  } catch (e) { /* never break the page */ }
})();
