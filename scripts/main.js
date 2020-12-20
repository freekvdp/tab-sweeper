document.getElementById('current-window-option').addEventListener('change', (element) => {
    storeCurrentWindowValue(element.target.checked).then(
        updateBadge,
        (e) => console.error('unable to store currentWindowChecked', e)
    );
});

setCurrentWindowOption().then(updateBadge);  // set initial currentWindowValue

function setCurrentWindowOption() {
    getCurrentWindowValue()
        .then(optionValue => {
            document.getElementById('current-window-option').checked = optionValue;
        });
}

function updateBadge() {
    getWindowTabs()
        .then(tabs => tabs.length)
        .then(tabCount => {
            const badgeText = tabCount > 0 ? tabCount.toString() : '';
            browser.browserAction.setBadgeText({ text: badgeText });
        })
}

function getWindowTabs() {
    const sweepTabPatterns = getSweepTabUrls()
        .then(urls => urls.map(url => url.pattern))

    return Promise.all([getSweepTabUrls(), getCurrentWindowValue()])
        .then(([queryTabUrls, currentWindowActive]) => {
            let queryObj = { url: queryTabUrls }
            if (currentWindowActive) {
                queryObj = { ...queryObj, currentWindow: true }
            }
            return browser.tabs.query(queryObj);
        })
}

browser.tabs.onActivated.addListener(updateBadge);
browser.tabs.onUpdated.addListener(updateBadge);
browser.tabs.onRemoved.addListener(updateBadge);
browser.windows.onFocusChanged.addListener((windowId) => {
    console.log("Newly focused window: " + windowId);
});
browser.windows.onFocusChanged.addListener(updateBadge);
