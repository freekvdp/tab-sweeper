// document.addEventListener("DOMContentLoaded", onLoad);

document.getElementById('current-window-option').addEventListener('change', (element) => {
    storeCurrentWindowValue(element.target.checked).then(
        updateBadge,
        (e) => console.error('unable to store currentWindowChecked', e)
    );
});

getCurrentWindowValue()
    .then(setCurrentWindowOption)
    .then(updateBadge);


function getCurrentWindowValue() {
    return browser.storage.local.get({ currentWindowChecked: false })
        .then(value => value.currentWindowChecked);
}

function storeCurrentWindowValue(value) {
    return browser.storage.local.set({ currentWindowChecked: value });
}

function setCurrentWindowOption() {
    console.log('set value',)
    getCurrentWindowValue()
        .then(optionValue => {
            console.log('current value', optionValue);
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

function getQueryTabUrls() {
    return ['*://*.www.google.com/*', '*://*.stackoverflow.com/*'];
}

function getWindowTabs() {
    const queryTabUrls = getQueryTabUrls();
    let queryObj = { url: queryTabUrls }

    return getCurrentWindowValue()
        .then(currentWindowChecked => {
            if (currentWindowChecked) {
                queryObj = { ...queryObj, currentWindow: true }
            }
            return browser.tabs.query(queryObj);
        });
}

browser.tabs.onActivated.addListener(updateBadge);
browser.tabs.onUpdated.addListener(updateBadge);
browser.tabs.onRemoved.addListener(updateBadge);
browser.windows.onFocusChanged.addListener((windowId) => {
    console.log("Newly focused window: " + windowId);
});
browser.windows.onFocusChanged.addListener(updateBadge);
