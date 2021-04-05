console.log("background script");

chrome.runtime.onMessage.addListener(function (message, sender, response) {
  const { type, payload } = message;

  switch (type) {
    case MESSAGES.NOTI:
      toastNotification(payload);
      break;
    case MESSAGES.TOGGLE:
      if (!payload) {
        chrome.browserAction.setIcon({ path: "images/16/cool-egg.png" });
      } else {
        chrome.browserAction.setIcon({ path: "images/16/cooler-egg.png" });
      }
      break;

    default:
      break;
  }
});

function toastNotification(message) {
  chrome.notifications.create({
    message: message + " is/are ready to take",
    type: "basic",
    iconUrl: "images/cool-egg.png",
    title: "Eggggggg!",
  });
}
