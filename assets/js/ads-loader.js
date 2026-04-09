/**
 * ============================================================
 *  AD MANAGER — Aggressive monetization config
 * ============================================================
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     SECTION 1 — POPUNDER SCRIPTS
     Fire on first user interaction (click or scroll).
  ────────────────────────────────────────────────────────── */
  var POPUNDER_SCRIPTS = [

    /* ── Onclick Popunder (al5sm.com) ── */
    {
      id: 'onclick-popunder',
      enabled: true,
      type: 'inline',
      code: `(function(s){s.dataset.zone='10853242',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    },

  ];


  /* ──────────────────────────────────────────────────────────
     SECTION 2 — PUSH / POPUP SCRIPTS
     Fire on first user interaction.
  ────────────────────────────────────────────────────────── */
  var POPUP_SCRIPTS = [

    /* ── Push Notifications (5gvci.com) ── */
    {
      id: 'push-notifications',
      enabled: true,
      type: 'src',
      src: 'https://5gvci.com/act/files/tag.min.js?z=10853246',
      attrs: { 'data-cfasync': 'false' }
    },

  ];


  /* ──────────────────────────────────────────────────────────
     SECTION 3 — BANNER / DISPLAY AD SCRIPTS
     Loaded immediately after page paint.
  ────────────────────────────────────────────────────────── */
  var BANNER_SCRIPTS = [

    /* ── Multitag (quge5.com) ── */
    {
      id: 'multitag',
      enabled: true,
      type: 'src',
      src: 'https://quge5.com/88/tag.min.js',
      attrs: { 'data-zone': '227970', 'data-cfasync': 'false' }
    },

    /* ── Inpage Push Banner (nap5k.com) ── */
    {
      id: 'inpage-push',
      enabled: true,
      type: 'inline',
      code: `(function(s){s.dataset.zone='10853247',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    },

    /* ── Vignette Banner (n6wxm.com) ── */
    {
      id: 'vignette',
      enabled: true,
      type: 'inline',
      code: `(function(s){s.dataset.zone='10853249',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    },

  ];


  /* ──────────────────────────────────────────────────────────
     TIMING — aggressive: minimal delays
  ────────────────────────────────────────────────────────── */
  var SETTINGS = {
    bannerDelay:   0,     // load banners immediately
    popunderDelay: 0,     // fire popunder on first interaction immediately
    popupDelay:    0,     // fire push on first interaction immediately
  };


  /* ══════════════════════════════════════════════════════════
     ENGINE
  ══════════════════════════════════════════════════════════ */

  function injectScript(entry) {
    if (!entry.enabled) return;
    try {
      var el = document.createElement('script');
      el.type = 'text/javascript';
      if (entry.type === 'inline') {
        el.textContent = entry.code;
      } else {
        el.async = true;
        el.src = entry.src;
        if (entry.attrs) {
          Object.keys(entry.attrs).forEach(function (k) {
            el.setAttribute(k, entry.attrs[k]);
          });
        }
        el.onerror = function () {
          console.warn('[AdManager] Failed to load: ' + entry.id);
        };
      }
      document.body.appendChild(el);
    } catch (e) {
      console.warn('[AdManager] Error injecting ' + entry.id + ':', e);
    }
  }

  function loadBanners() {
    BANNER_SCRIPTS.forEach(function (entry) { injectScript(entry); });
  }

  function loadPopunders() {
    POPUNDER_SCRIPTS.forEach(function (entry) { injectScript(entry); });
  }

  function loadPopups() {
    POPUP_SCRIPTS.forEach(function (entry) { injectScript(entry); });
  }

  function attachInteractionTrigger() {
    var triggered = false;
    function onInteraction() {
      if (triggered) return;
      triggered = true;
      document.removeEventListener('click',  onInteraction, true);
      document.removeEventListener('scroll', onInteraction, true);
      setTimeout(loadPopunders, SETTINGS.popunderDelay);
      setTimeout(loadPopups,    SETTINGS.popupDelay);
    }
    document.addEventListener('click',  onInteraction, { once: true, capture: true, passive: true });
    document.addEventListener('scroll', onInteraction, { once: true, capture: true, passive: true });
  }

  function init() {
    setTimeout(loadBanners, SETTINGS.bannerDelay);
    attachInteractionTrigger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
