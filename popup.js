document.addEventListener('DOMContentLoaded', async () => {
    const toggle = document.getElementById('toggle-block');
    const input = document.getElementById('domain-input');
    const addButton = document.getElementById('add-domain');
    const whitelistUl = document.getElementById('whitelist');
  
    const { isEnabled, whitelist } = await chrome.storage.sync.get(["isEnabled", "whitelist"]);
  
    toggle.checked = isEnabled;
    renderWhitelist(whitelist || []);
  
    toggle.addEventListener('change', () => {
      chrome.storage.sync.set({ isEnabled: toggle.checked });
    });
  
    addButton.addEventListener('click', async () => {
      const domain = input.value.trim();

      const domainRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(\/[^\s]*)?$/i;
    
      if (domain && domainRegex.test(domain)) {
        const { whitelist } = await chrome.storage.sync.get("whitelist");
        const updatedWhitelist = [...(whitelist || []), domain];
        chrome.storage.sync.set({ whitelist: updatedWhitelist });
        input.value = '';
        renderWhitelist(updatedWhitelist);
      } else {
        alert("Please enter a valid domain or URL.");
      }
    });
    
  
    async function removeDomain(domainToRemove) {
      const { whitelist } = await chrome.storage.sync.get("whitelist");
      const updatedWhitelist = (whitelist || []).filter(domain => domain !== domainToRemove);
      await chrome.storage.sync.set({ whitelist: updatedWhitelist });
      renderWhitelist(updatedWhitelist);
    }
  
    function renderWhitelist(list) {
      whitelistUl.innerHTML = ''; 
      list.forEach(domain => {
        const li = document.createElement('li');
        
        const removeButton = document.createElement('button');
        removeButton.textContent = '❌';

        removeButton.style.background = 'none';  
        removeButton.style.border = 'none';      
        removeButton.style.color = '#ff0000';   
        removeButton.style.fontSize = '16px';    
        removeButton.style.cursor = 'pointer';  
        removeButton.style.padding = '0';        
        removeButton.style.marginRight = '5px'; 
        
        removeButton.addEventListener('click', () => removeDomain(domain));
    
        li.appendChild(removeButton);
        li.appendChild(document.createTextNode(domain));
        
        whitelistUl.appendChild(li);
      });
    }
    
    
  });
  