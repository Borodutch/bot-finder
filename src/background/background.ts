chrome.runtime.onInstalled.addListener(function (details) {
  chrome.storage.local.set({ bots: true });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'RELOAD' }, function (_) {
        void chrome.runtime.lastError;
      });
    }
  });
});
