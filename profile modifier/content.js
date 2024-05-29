function replaceProfilePictures(imageUrl) {
    // Select all profile pictures in the LinkedIn feed
    const profilePictures = document.querySelectorAll('img.feed-shared-actor__avatar-image, img.update-components-actor__avatar-image');
  
    // Loop through each profile picture and replace the src and srcset attributes
    profilePictures.forEach(img => {
      img.src = imageUrl;
      img.srcset = imageUrl;
    });
  
    // Replace the srcset attribute in picture elements if present
    const pictureElements = document.querySelectorAll('picture.feed-shared-actor__avatar-image-source, picture.update-components-actor__avatar-image-source');
    pictureElements.forEach(picture => {
      const sources = picture.querySelectorAll('source');
      sources.forEach(source => {
        source.srcset = imageUrl;
      });
    });
  }
  
  // Run the function when the content script loads
  chrome.storage.sync.get('imageUrl', (data) => {
    if (data.imageUrl) {
      replaceProfilePictures(data.imageUrl);
    }
  });
  
  // Observe the DOM for changes and replace profile pictures dynamically
  const observer = new MutationObserver(() => {
    chrome.storage.sync.get('imageUrl', (data) => {
      if (data.imageUrl) {
        replaceProfilePictures(data.imageUrl);
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'replacePictures' && request.imageUrl) {
      replaceProfilePictures(request.imageUrl);
      sendResponse({ success: true });
    }
  });
  