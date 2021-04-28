document.addEventListener("DOMContentLoaded", setBadgeNumber);
browser.windows.onFocusChanged.addListener(setBadgeNumber);
browser.tabs.onActivated.addListener(setBadgeNumber);
browser.tabs.onUpdated.addListener(setBadgeNumber);
browser.tabs.onRemoved.addListener(setBadgeNumber);

function setBadgeNumber() {
  browser.storage.local
    .get()
    .then(({ sweepTabOptions, currentWindowChecked }) => {
      const filteredPatterns = sweepTabOptions
        ? sweepTabOptions
            .filter((option) => !!option.active)
            .map((option) => option.pattern)
        : [];

      let query = { url: filteredPatterns };
      if (currentWindowChecked) {
        query = { ...query, currentWindow: true };
      }
      return browser.tabs.query(query);
    })
    .then((tabs) => tabs.length)
    .then((tabCount) => {
      const badgeText = tabCount > 0 ? tabCount.toString() : "";
      browser.browserAction.setBadgeText({ text: badgeText });
      browser.browserAction.setBadgeBackgroundColor({
        color: "rgb(127, 238, 241)",
      });
    });
}
