chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ imageUrl: '' }, () => {
      console.log('The default image URL is set.');
    });
  });
  