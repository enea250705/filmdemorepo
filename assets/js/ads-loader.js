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
      // Load first ad script asynchronously
      const adScript1 = document.createElement('script');
      adScript1.type = 'text/javascript';
      adScript1.async = true;
      adScript1.src = 'https://pl28120168.effectivegatecpm.com/a8/d0/49/a8d0498b8dafa67dfc94c7ff817bbbbc.js';
      adScript1.onerror = function() {
        console.warn('Ad script 1 failed to load');
      };
      adScript1.onload = function() {
        console.log('Ad script 1 loaded successfully');
      };
      document.body.appendChild(adScript1);
      
      // Load second ad script asynchronously
      const adScript2 = document.createElement('script');
      adScript2.type = 'text/javascript';
      adScript2.async = true;
      adScript2.src = 'https://pl28120183.effectivegatecpm.com/0f/2c/43/0f2c431bf8d3dae6a00a87b5ff3dc9eb.js';
      adScript2.onerror = function() {
        console.warn('Ad script 2 failed to load');
      };
      adScript2.onload = function() {
        console.log('Ad script 2 loaded successfully');
      };
      document.body.appendChild(adScript2);
      
      // Load third ad script (highperformanceformat) - configuration first, then loader
      const adConfig3 = document.createElement('script');
      adConfig3.type = 'text/javascript';
      adConfig3.textContent = `
	atOptions = {
		'key' : 'efcbf04d5d9aa2ab70930eccd37b2820',
		'format' : 'iframe',
		'height' : 50,
		'width' : 320,
		'params' : {}
	};
      `;
      document.body.appendChild(adConfig3);
      
      const adScript3 = document.createElement('script');
      adScript3.type = 'text/javascript';
      adScript3.async = true;
      adScript3.src = 'https://www.highperformanceformat.com/efcbf04d5d9aa2ab70930eccd37b2820/invoke.js';
      adScript3.onerror = function() {
        console.warn('Ad script 3 failed to load');
      };
      adScript3.onload = function() {
        console.log('Ad script 3 loaded successfully');
      };
      document.body.appendChild(adScript3);
      
      // Load fourth ad script asynchronously
      const adScript4 = document.createElement('script');
      adScript4.type = 'text/javascript';
      adScript4.async = true;
      adScript4.setAttribute('data-cfasync', 'false');
      adScript4.src = 'https://pl28120178.effectivegatecpm.com/39118a42908635bbe024c3dfce4caa5a/invoke.js';
      adScript4.onerror = function() {
        console.warn('Ad script 4 failed to load');
      };
      adScript4.onload = function() {
        console.log('Ad script 4 loaded successfully');
      };
      document.body.appendChild(adScript4);
      
      console.log('All ad scripts initiated');
      
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
  
  // Initialize ad loading - ensure body exists
  function initAds() {
    if (document.body) {
      setTimeout(loadAds, AD_CONFIG.loadDelay);
    } else {
      // Wait for body to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          setTimeout(loadAds, AD_CONFIG.loadDelay);
        });
      } else {
        // Use a small delay to ensure body is ready
        setTimeout(function() {
          if (document.body) {
            setTimeout(loadAds, AD_CONFIG.loadDelay);
          } else {
            // Fallback: try again after a short delay
            setTimeout(initAds, 100);
          }
        }, 100);
      }
    }
  }
  
  // Start initialization
  initAds();
  
})();


