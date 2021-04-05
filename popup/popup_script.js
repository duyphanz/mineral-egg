console.log("popup script");

const targetSite = "https://trade.vndirect.com.vn/chung-khoan/hose";

// Add onclick event listener to start button
document.querySelector("#start-btn").addEventListener("click", start);

function start() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    const { id, url } = tab[0] || {};

    if (url !== targetSite) {
      alert("Only work at " + targetSite);
    } else {
      chrome.tabs.sendMessage(id, {
        type: "START",
      });
    }
  });
}
