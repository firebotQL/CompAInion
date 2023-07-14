import { useEffect, useState } from "react";

const Popup = () => {
  const [serverUrl, setServerUrl] = useState("");
  const [authHeader, setAuthHeader] = useState("");

  const [notification, setNotification] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(
      ["compainion-serverUrl", "compainion-authHeader"],
      (result) => {
        if (result["compainion-serverUrl"]) {
          setServerUrl(result["compainion-serverUrl"]);
        }
        if (result["compainion-authHeader"]) {
          setAuthHeader(result["compainion-authHeader"]);
        }
      }
    );
  }, []);

  const saveSettings = () => {
    chrome.storage.sync.set({ "compainion-serverUrl": serverUrl }, () => {
      console.log("Item stored successfully");
    });
    chrome.storage.sync.set({ "compainion-authHeader": authHeader }, () => {
      console.log("Item stored successfully");
    });
    setNotification("Settings saved successfully!");
    setTimeout(() => setNotification(""), 2000); // clear notification after 2s
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <div className="bg-white rounded shadow-lg p-6">
        <h2 className="text-2xl mb-4">Settings</h2>
        <label className="block mb-2">Server URL:</label>
        <input
          className="border mb-4 w-full p-2"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
        <label className="block mb-2">Auth Header:</label>
        <input
          className="border mb-4 w-full p-2"
          value={authHeader}
          onChange={(e) => setAuthHeader(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={saveSettings}
        >
          Save
        </button>
        {notification && <p className="mt-4 text-green-500">{notification}</p>}
      </div>
    </div>
  );
};

export default Popup;
