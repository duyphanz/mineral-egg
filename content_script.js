var eggs = {
  AAA: 15,
  AAM: 10,
};

console.log("content script");

// Listen messages from background/pop-up script
chrome.runtime.onMessage.addListener((msg) => {
  const { type, payload } = msg;

  switch (type) {
    case MESSAGES.START:
      let matchingEggs = [];
      if (window.eggInterval) {
        clearInterval(window.eggInterval);
        window.eggInterval = null;

        chrome.runtime.sendMessage({
          type: MESSAGES.TOGGLE,
        });
      } else {
        const eggInterval = setInterval(() => {
          console.info("Running", eggs);

          Object.keys(eggs).forEach((egg) => {
            const eggEl = document.querySelector(
              "#" + egg + " .price-tooltip .txt-gia-tc"
            );

            if (eggEl && +eggEl.innerText >= eggs[egg]) {
              matchingEggs.push(egg);
              delete eggs[egg];
            }
          });

          if (matchingEggs.length > 0) {
            chrome.runtime.sendMessage({
              type: MESSAGES.NOTI,
              payload: matchingEggs.join(", "),
            });
            matchingEggs = [];
          }
        }, 1000);

        window.eggInterval = eggInterval;
        chrome.runtime.sendMessage({
          type: MESSAGES.TOGGLE,
          payload: true,
        });
      }
      break;
    default:
      break;
  }
});
