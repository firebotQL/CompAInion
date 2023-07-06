// // Define the tab interface
// interface Tab {
//   id: number;
// }

// // Send a message to the content script
// function getSelectedText(tab: chrome.tabs.Tab) {
//   if (tab.id === undefined) return;
//   chrome.tabs.sendMessage(
//     tab.id,
//     { message: "getSelectedText" },
//     handleResponseBackground
//   );
// }

// // Handle response from content script
// function handleResponseBackground(response: { data: string }) {
//   console.log("selected text:", response.data);
//   // call your external API here
// }

// // Listen for an action from the user
// chrome.action.onClicked.addListener(getSelectedText);

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "" }, // Add specific host if needed, e.g., "example.com"
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
