var currentWindowChecked = false;

function getCurrentWindowChecked() {
    const optionElement = document.getElementById('current-window-option');

    if (document.readyState === 'complete' && !!optionElement) {
        return optionElement.checked;
    }
    return false;
}

document.getElementById('current-window-option').addEventListener('change', function () {
    currentWindowChecked = getCurrentWindowChecked();
    updateBadge();
});

function updateBadge() {
    getWindowTabs()
        .then(tabs => tabs.length)
        .then(tabCount => {
            const badgeText = tabCount > 0 ? tabCount.toString() : '';
            browser.browserAction.setBadgeText({ text: badgeText });
        })
}

function getQueryTabUrls() {
    return ['*://*.www.google.com/*', '*://*.stackoverflow.com/*'];
}

function getWindowTabs() {
    const queryTabUrls = getQueryTabUrls();

    let queryObj = { url: queryTabUrls }
    if (currentWindowChecked) {
        queryObj = { ...queryObj, currentWindow: true }
    }
    return browser.tabs.query(queryObj);
}

document.addEventListener("DOMContentLoaded", updateBadge);
browser.tabs.onActivated.addListener(updateBadge);
browser.tabs.onUpdated.addListener(updateBadge);
browser.tabs.onRemoved.addListener(updateBadge);
