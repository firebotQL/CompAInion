// // Create a message interface
// interface Message {
//   message: string;
// }

// // Listen for messages from the background script
// chrome.runtime.onMessage.addListener(
//   (request: Message, sender, sendResponse) => {
//     if (request.message === "getSelectedText") {
//       sendResponse({ data: window.getSelection().toString() });
//     }
//   }
// );

const chatContainer = document.createElement("div");
chatContainer.id = "chatContainer";
// Customize the styles of the chat container as per your requirements
chatContainer.style.position = "fixed";
chatContainer.style.top = "0";
chatContainer.style.right = "0";
chatContainer.style.width = "300px";
chatContainer.style.height = "100vh";
chatContainer.style.backgroundColor = "white";
chatContainer.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
chatContainer.style.zIndex = "9999";

// Append the chat container to the document body
document.body.appendChild(chatContainer);

// import ReactDOM from "react-dom";

// const ChatContainer = () => {
//   return (
//     <div id="chatContainer">
//       {/* Add your chat sidebar content here */}
//       <h2>Chat Sidebar</h2>
//       {/* Add more components, text inputs, buttons, etc. */}
//     </div>
//   );
// };

// ReactDOM.render(<ChatContainer />, document.body);
