/**
 * ============================================================
 *  AD MANAGER — Popunders, Popups & Banner Scripts
 *  Add your ad network scripts in the arrays below.
 *  The loader handles timing, error isolation, and triggers.
 * ============================================================
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     SECTION 1 — POPUNDER SCRIPTS
     Each entry fires once per user session (first click).
     Set `enabled: false` to temporarily disable one.
  ────────────────────────────────────────────────────────── */
  var POPUNDER_SCRIPTS = [

    /* ── Monetag popunder ── */
    {
      id: 'monetag',
      enabled: true,
      type: 'inline',   // inline JS code
      code: `(function(){var y=window,v="c15841a454a1e0a216083faa6a9a9554",e=[["siteId",923*757-4*28+4543465],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],x=["d3d3LmludGVsbGlwb3B1cC5jb20vY2dhcmxpYy5taW4uY3Nz","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvRkJOL2ZsZWFmbGV0LmFqYXgubWluLmpz"],h=-1,o,d,w=function(){clearTimeout(d);h++;if(x[h]&&!(1784918438000<(new Date).getTime()&&1<h)){o=y.document.createElement("script");o.type="text/javascript";o.async=!0;var g=y.document.getElementsByTagName("script")[0];o.src="https://"+atob(x[h]);o.crossOrigin="anonymous";o.onerror=w;o.onload=function(){clearTimeout(d);y[v.slice(0,16)+v.slice(0,16)]||w()};d=setTimeout(w,5E3);g.parentNode.insertBefore(o,g)}};if(!y[v]){try{Object.freeze(y[v]=e)}catch(e){}w()}})();`
    },

    /* ── ADD NEW POPUNDER SCRIPTS BELOW ──────────────────────
       Example — external src:
       {
         id: 'network2-popunder',
         enabled: true,
         type: 'src',
         src: 'https://example.com/popunder.js',
         attrs: { 'data-zone': '12345' }
       }

       Example — inline code:
       {
         id: 'network3-popunder',
         enabled: true,
         type: 'inline',
         code: '/* paste raw JS here *\/'
       }
    ────────────────────────────────────────────────────────── */

  ];


  /* ──────────────────────────────────────────────────────────
     SECTION 2 — POPUP SCRIPTS
     Fire on first user interaction (click or scroll).
  ────────────────────────────────────────────────────────── */
  var POPUP_SCRIPTS = [

    /* ── ADD POPUP SCRIPTS HERE ──────────────────────────────
       {
         id: 'popup-network1',
         enabled: true,
         type: 'src',
         src: 'https://example.com/popup.js',
         attrs: {}
       }
    ────────────────────────────────────────────────────────── */

  ];


  /* ──────────────────────────────────────────────────────────
     SECTION 3 — BANNER / DISPLAY AD SCRIPTS
     Loaded silently after page paint, no user trigger needed.
  ────────────────────────────────────────────────────────── */
  var BANNER_SCRIPTS = [

    /* ── effectivegatecpm #1 ── */
    {
      id: 'effectivegatecpm-1',
      enabled: true,
      type: 'src',
      src: 'https://pl28120168.effectivegatecpm.com/a8/d0/49/a8d0498b8dafa67dfc94c7ff817bbbbc.js',
      attrs: {}
    },

    /* ── effectivegatecpm #2 ── */
    {
      id: 'effectivegatecpm-2',
      enabled: true,
      type: 'src',
      src: 'https://pl28120183.effectivegatecpm.com/0f/2c/43/0f2c431bf8d3dae6a00a87b5ff3dc9eb.js',
      attrs: {}
    },

    /* ── fpyf8 ── */
    {
      id: 'fpyf8',
      enabled: true,
      type: 'src',
      src: 'https://fpyf8.com/88/tag.min.js',
      attrs: { 'data-zone': '187556', 'data-cfasync': 'false' }
    },

    /* ── highperformanceformat — needs inline config first ── */
    {
      id: 'highperformanceformat-config',
      enabled: true,
      type: 'inline',
      code: `atOptions={'key':'efcbf04d5d9aa2ab70930eccd37b2820','format':'iframe','height':50,'width':320,'params':{}};`
    },
    {
      id: 'highperformanceformat',
      enabled: true,
      type: 'src',
      src: 'https://www.highperformanceformat.com/efcbf04d5d9aa2ab70930eccd37b2820/invoke.js',
      attrs: {}
    },

    /* ── ADD MORE BANNER SCRIPTS BELOW ───────────────────────
       {
         id: 'my-banner-network',
         enabled: true,
         type: 'src',          // 'src' or 'inline'
         src: 'https://...',
         attrs: { 'data-zone': '999' }
       }
    ────────────────────────────────────────────────────────── */

  ];


  /* ──────────────────────────────────────────────────────────
     TIMING SETTINGS
  ────────────────────────────────────────────────────────── */
  var SETTINGS = {
    bannerDelay:   1200,   // ms after page load before loading banner ads
    popunderDelay: 2500,   // ms after first user interaction before firing popunders
    popupDelay:    1500,   // ms after first user interaction before firing popups
  };


  /* ══════════════════════════════════════════════════════════
     ENGINE — do not edit below unless you know what you're doing
  ══════════════════════════════════════════════════════════ */

  /**
   * Injects one script entry (src or inline) into <body>.
   * Errors are caught individually so one bad script can't break others.
   */
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

  /** Load all banner scripts after a short delay. */
  function loadBanners() {
    BANNER_SCRIPTS.forEach(function (entry) {
      injectScript(entry);
    });
  }

  /** Load all popunder scripts — called on first user interaction. */
  function loadPopunders() {
    POPUNDER_SCRIPTS.forEach(function (entry) {
      injectScript(entry);
    });
  }

  /** Load all popup scripts — called on first user interaction. */
  function loadPopups() {
    POPUP_SCRIPTS.forEach(function (entry) {
      injectScript(entry);
    });
  }

  /**
   * Attach a one-time trigger for popunders + popups.
   * Fires on the first click OR first scroll — whichever comes first.
   */
  function attachInteractionTrigger() {
    var triggered = false;

    function onInteraction() {
      if (triggered) return;
      triggered = true;

      // Remove listeners immediately to prevent double-fire
      document.removeEventListener('click',  onInteraction, true);
      document.removeEventListener('scroll', onInteraction, true);

      setTimeout(loadPopunders, SETTINGS.popunderDelay);
      setTimeout(loadPopups,    SETTINGS.popupDelay);
    }

    document.addEventListener('click',  onInteraction, { once: true, capture: true, passive: true });
    document.addEventListener('scroll', onInteraction, { once: true, capture: true, passive: true });
  }

  /** Entry point — called once DOM is ready. */
  function init() {
    // Banners load automatically after a short delay
    setTimeout(loadBanners, SETTINGS.bannerDelay);

    // Popunders + popups wait for the user to interact
    attachInteractionTrigger();
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
