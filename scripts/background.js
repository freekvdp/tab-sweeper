document.addEventListener("DOMContentLoaded", setInitialBadgeNumber);

function setInitialBadgeNumber() {
    browser.storage.local.get()
        .then(({ sweepTabUrls, currentWindowActive }) => {
            const filteredPatterns = sweepTabUrls
                .filter(url => !!url.active)
                .map(url => url.pattern);

            let query = { url: patterns };
            if (currentWindowActive) {
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
