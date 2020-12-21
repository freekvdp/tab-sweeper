function getCurrentWindowValue() {
    return browser.storage.local.get({ currentWindowChecked: false })
        .then(value => value.currentWindowChecked);
}

function storeCurrentWindowValue(value) {
    return browser.storage.local.set({ currentWindowChecked: value });
}

function getSweepTabUrls() {
    return browser.storage.local.get({ sweepTabUrls: [] })
        .then(value => value.sweepTabUrls);
}

function storeSweepTabs(urls) {
    return browser.storage.local.set({ sweepTabUrls: urls })
}