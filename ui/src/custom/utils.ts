export const addUseClick = () => {
  document.addEventListener("mouseup", function (e) {
    if (!window) {
      console.log("Code couldn't recognize window object");
    }
    var selectedText = window?.getSelection()?.toString().trim();
    if (selectedText && selectedText.length > 0) {
      var useButton = document.createElement("button");
      useButton.innerText = "Use";
      useButton.style.position = "fixed";
      useButton.style.top = e.pageY + "px";
      useButton.style.left = e.pageX + "px";

      useButton.addEventListener("click", function (this: HTMLButtonElement) {
        chrome.runtime.sendMessage({ text: selectedText });

        // 'this' now refers to the 'useButton'
        this.remove();
      });

      document.body.appendChild(useButton);
    }
  });
};
