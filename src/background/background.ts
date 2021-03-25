chrome.runtime.onInstalled.addListener(function (details) {
  chrome.storage.local.set({ bots: true });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id || 0,
      { action: 'RELOAD' },
      function (response) {
        void chrome.runtime.lastError;
      }
    );
  });
});
