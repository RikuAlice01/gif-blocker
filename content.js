// Function to get data from Chrome's storage
function getStorage(keys) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError); // Handle error if storage retrieval fails
        } else {
          resolve(items); // Resolve with the retrieved items
        }
      });
    });
  }
  
  async function blockGIFs() {
    try {
      // Retrieve settings from Chrome storage
      const { isEnabled, whitelist } = await getStorage(["isEnabled", "whitelist"]);
      let domain = window.location.hostname.replace(/^www\./, ''); // Remove 'www.' from domain for consistency
  
      if (!isEnabled || (whitelist && whitelist.includes(domain))) {
        return; // If GIF blocking is disabled or the domain is in the whitelist, do nothing
      }
  
      // Function to remove GIFs from the DOM
      function removeGIF(img) {
        if (!img || !img.src) return; // Return if the image or its source is invalid
        const src = img.src || '';
        if (src.endsWith('.gif') || src.includes('.gif')) {
          img.remove(); // Remove the <img> element from the DOM
          removeAdRelatedElements(img); // Remove parent elements related to ads
        }
      }
  
      // Function to remove ad-related parent elements of the GIF
      function removeAdRelatedElements(element) {
        const parentDiv = element.closest('div.adlf, div.adcen, div.adrg, div.adl, div.ad, div.banner_top');
        if (parentDiv) {
          parentDiv.remove(); // Remove the <div> if it's an ad-related element
        }
        const parentAside = element.closest('aside.ad');
        if (parentAside) {
          parentAside.remove(); // Remove the <aside> if it's an ad-related element
        }
      }
  
      // Function to scan and remove GIFs from the entire DOM
      function scanAndRemoveGIFs(root = document) {
        const elements = root.querySelectorAll('img, div, aside'); // Query all img, div, aside elements
        elements.forEach((element) => {
          if (element.tagName === 'IMG') {
            removeGIF(element); // Remove GIF if the element is an image
          } else if (element.tagName === 'DIV' || element.tagName === 'ASIDE') {
            // If the element is an ad-related div or aside, remove it
            if (['adlf', 'adcen', 'adrg', 'ad', 'adl','banner_top'].some(className => element.classList.contains(className))) {
              element.remove(); // Remove the ad-related element
            }
          }
        });
      }
  
      // Function to initialize the GIF blocking
      function initialize() {
        scanAndRemoveGIFs(); // Scan and remove GIFs immediately after the page loads
        setupMutationObserver(); // Set up a MutationObserver to track changes in the DOM
      }
  
      // Function to set up the MutationObserver to watch for added nodes or changes to the src attribute
      function setupMutationObserver() {
        const observer = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
              if (node.tagName === 'IMG') {
                removeGIF(node); // If an IMG is added, remove GIF
              } else if (node.querySelectorAll) {
                scanAndRemoveGIFs(node); // If a larger element is added, scan and remove GIFs inside it
              }
            });
            // Check if the src attribute of an IMG has changed, and remove the GIF if necessary
            if (mutation.type === 'attributes' && mutation.target.tagName === 'IMG' && mutation.attributeName === 'src') {
              removeGIF(mutation.target); // Remove the GIF if the src attribute changes
            }
          });
        });
  
        observer.observe(document.body, { 
          childList: true,  // Observe for added child nodes
          subtree: true,    // Observe the entire subtree
          attributes: true, // Observe changes to attributes
          attributeFilter: ['src'] // Specifically track changes to the src attribute of IMG elements
        });
  
        // Disconnect the observer after 10 seconds to improve performance
        setTimeout(() => observer.disconnect(), 10000); // Stop observing after 10 seconds
      }
  
      // Start the functionality when the page finishes loading
      window.onload = initialize;
  
    } catch (error) {
      console.error('Error while blocking GIFs:', error); // Log any errors during execution
    }
  }
  
  // Start blocking GIFs
  blockGIFs();
  