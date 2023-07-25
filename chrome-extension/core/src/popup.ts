// // Listen for button click and then send a message to the content script
// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("getText")!.addEventListener("click", () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(
//         tabs[0].id!,
//         { message: "getSelectedText" },
//         handleResponsePopup
//       );
//     });
//   });
// });

// // Handle response from content script
// function handleResponsePopup(response: { data: string }) {
//   document.getElementById("selectedText")!.innerText = response.data;
//   // You could add code here to send a request to your external API
//   // then update the UI with the API's response.
// }

document.addEventListener("DOMContentLoaded", function () {
  const messageInput = document.getElementById(
    "messageInput"
  ) as HTMLInputElement;
  const sendButton = document.getElementById("sendButton");
  const chatMessages = document.getElementById("chatMessages");

  sendButton.addEventListener("click", function () {
    const message = messageInput.value;
    displayMessage(message);
    messageInput.value = "";
  });

  function displayMessage(message: string) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
  }
});
