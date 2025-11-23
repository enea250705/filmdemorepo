/**
 * Safe Ad Script Loader
 * Loads ads asynchronously after page content has loaded
 * Prevents blocking of main content
 */

(function() {
  'use strict';
  
  // Configuration
  const AD_CONFIG = {
    monetagId: '0f54a557bb1f88f3fc04961e28004070',
    adScriptVar: 'c15841a454a1e0a216083faa6a9a9554',
    maxPopunders: 3, // Reduced to be less aggressive
    initDelay: 2000, // Wait 2 seconds before initializing popunders
    loadDelay: 1000  // Wait 1 second after page load before loading ads
  };
  
  /**
   * Load ads safely after page content
   */
  function loadAds() {
    try {
      // Load monetag popunder script asynchronously
      const monetagScript = document.createElement('script');
      monetagScript.type = 'text/javascript';
      monetagScript.async = true;
      monetagScript.setAttribute('data-cfasync', 'false');
      monetagScript.textContent = `
/*<![CDATA[/* */
(function(){var y=window,v="${AD_CONFIG.adScriptVar}",e=[["siteId",923*757-4*28+4543465],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],x=["d3d3LmludGVsbGlwb3B1cC5jb20vY2dhcmxpYy5taW4uY3Nz","ZDNtcjd5MTU0ZDJxZzUuY2xvdWRmcm9udC5uZXQvRkJOL2ZsZWFmbGV0LmFqYXgubWluLmpz"],h=-1,o,d,w=function(){clearTimeout(d);h++;if(x[h]&&!(1784918438000<(new Date).getTime()&&1<h)){o=y.document.createElement("script");o.type="text/javascript";o.async=!0;var g=y.document.getElementsByTagName("script")[0];o.src="https://"+atob(x[h]);o.crossOrigin="anonymous";o.onerror=w;o.onload=function(){clearTimeout(d);y[v.slice(0,16)+v.slice(0,16)]||w()};d=setTimeout(w,5E3);g.parentNode.insertBefore(o,g)}};if(!y[v]){try{Object.freeze(y[v]=e)}catch(e){}w()}})();
/*]]>/* */
      `;
      document.body.appendChild(monetagScript);
      
      // Load popunder trigger after monetag script has time to initialize
      setTimeout(function() {
        try {
          let popunderCount = 0;
          let hasTriggered = false;
          
          function triggerPopunder() {
            if (popunderCount >= AD_CONFIG.maxPopunders) return;
            
            try {
              // Use the correct variable name
              const adScript = window[AD_CONFIG.adScriptVar];
              if (adScript && typeof adScript.triggerPopunder === 'function') {
                adScript.triggerPopunder();
                popunderCount++;
              }
            } catch (e) {
              // Silently fail - don't block page
            }
          }
          
          // Only trigger on specific user actions (not every click)
          // Trigger once on first click after page load
          document.addEventListener('click', function(e) {
            if (!hasTriggered) {
              hasTriggered = true;
              setTimeout(triggerPopunder, 500);
            }
          }, { once: true, passive: true });
          
        } catch (e) {
          // Silently fail - ads are optional
        }
      }, AD_CONFIG.initDelay);
      
    } catch (e) {
      // Silently fail - ads shouldn't break the site
      console.warn('Ad script loading failed (non-critical):', e);
    }
  }
  
  // Initialize ad loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(loadAds, AD_CONFIG.loadDelay);
    });
  } else {
    // Page already loaded, wait a bit for content to render
    setTimeout(loadAds, AD_CONFIG.loadDelay);
  }
  
})();


