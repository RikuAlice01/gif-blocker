chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ isEnabled: true, whitelist: [] });
  });
  