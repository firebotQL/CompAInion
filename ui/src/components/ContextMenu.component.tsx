import { Button } from "@/components/ui/button";
import React, { CSSProperties, useEffect, useState } from "react"; // Import your custom button component

interface ButtonStyle extends CSSProperties {
  top?: string;
  left?: string;
}

const ContextMenu: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>({
    display: "none",
  }); // Initially hide the button

  useEffect(() => {
    function handleMouseUp(e: MouseEvent) {
      const text = window.getSelection()?.toString().trim() || "";
      setSelectedText(text);
      if (text) {
        setButtonStyle({
          display: "block",
          position: "fixed",
          top: `${e.pageY}px`,
          left: `${e.pageX}px`,
        });
      }
    }

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleButtonClick = () => {
    console.log(selectedText);
    // Save selectedText to chrome storage
    chrome.storage.sync.set({ selectedUseText: selectedText }, () => {
      console.log("Value is set to " + selectedText);
    });
    setSelectedText(""); // Clear the selected text
    setButtonStyle({ display: "none" }); // Hide the button after click
  };

  return (
    <div>
      {selectedText && (
        <Button
          onClick={handleButtonClick}
          style={buttonStyle}
          className="text-white bg-blue-500 px-4 py-2 rounded"
        >
          Use
        </Button>
      )}
    </div>
  );
};

export default ContextMenu;
