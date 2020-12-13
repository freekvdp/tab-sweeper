function updateBadge() {
    getWindowTabs(false)
        .then(tabs => tabs.length)
        .then(tabCount => {
            const badgeText = tabCount > 0 ? tabCount.toString() : '';
            browser.browserAction.setBadgeText({ text: badgeText });
        })
}

function getWindowTabs(currentWindowOnly) {
    const queryTabUrls = ['*://*.www.google.com/*', '*://*.stackoverflow.com/*'];

    let queryObj = { url: queryTabUrls }
    if (currentWindowOnly) {
        queryObj = { ...queryObj, currentWindow: true }
    }
    return browser.tabs.query(queryObj);
}

document.addEventListener("DOMContentLoaded", updateBadge);
browser.tabs.onActivated.addListener(updateBadge);
browser.tabs.onUpdated.addListener(updateBadge);
browser.tabs.onRemoved.addListener(updateBadge);
