var eggs = {
  AAA: 15,
};

if (window.eggInterval) {
  clearInterval(window.eggInterval);
  window.eggInterval = null;
} else {
  const eggInterval = setInterval(() => {
    console.info("Running");
    Object.keys(eggs).forEach((egg) => {
      const eggEl = document.querySelector(
        "#" + egg + " .price-tooltip .txt-gia-tc"
      );

      if (eggEl && +eggEl.innerText >= eggs[egg]) {
        chrome.runtime.sendMessage("ppbphbakmpdiogmaileaefiddejganeg", {
          type: "NOTI",
          payload: egg,
        });

        delete eggs[egg];
      }
    });
  }, 1000);

  window.eggInterval = eggInterval;
}
