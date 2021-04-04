document.querySelector("#start-btn").addEventListener("click", start);

function start() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    chrome.tabs.executeScript(tab.id, {
      file: "inject.js",
    });
  });
}
