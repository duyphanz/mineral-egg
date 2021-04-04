chrome.runtime.onMessage.addListener(function (message, sender, response) {
  const { type, payload } = message;

  switch (type) {
    case "NOTI":
      toastNotification(payload);
      break;

    default:
      break;
  }
});

function toastNotification(message) {
  chrome.notifications.create({
    message: message + " is ready to take",
    type: "basic",
    iconUrl: "images/cool-egg.png",
    title: "Eggggggg!",
  });
}
