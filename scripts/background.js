document.addEventListener("DOMContentLoaded", setBadgeNumber);
browser.windows.onFocusChanged.addListener(setBadgeNumber);
browser.tabs.onActivated.addListener(setBadgeNumber);
browser.tabs.onUpdated.addListener(setBadgeNumber);
browser.tabs.onRemoved.addListener(setBadgeNumber);

function setBadgeNumber() {
    browser.storage.local.get()
        .then(({ sweepTabUrls, currentWindowChecked }) => {
            console.log(sweepTabUrls);
            const filteredPatterns = sweepTabUrls
                ? sweepTabUrls
                    .filter(url => !!url.active)
                    .map(url => url.pattern)
                : [];

            let query = { url: filteredPatterns };
            if (currentWindowChecked) {
                query = { ...query, currentWindow: true }
            }
            return browser.tabs.query(query);
        })
        .then(tabs => tabs.length)
        .then(tabCount => {
            const badgeText = tabCount > 0 ? tabCount.toString() : '';
            browser.browserAction.setBadgeText({ text: badgeText });
        })
}
