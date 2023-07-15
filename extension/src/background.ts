chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    // The tab has finished loading, clear the storage
    chrome.storage.sync.remove("selectedUseText", function () {
      console.log("selectedUseText has been cleaer for the current tab");
    });
  }
});
