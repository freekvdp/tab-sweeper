function getCurrentWindowValue() {
    return browser.storage.local.get({ currentWindowChecked: false })
        .then(value => value.currentWindowChecked);
}

function storeCurrentWindowValue(value) {
    return browser.storage.local.set({ currentWindowChecked: value });
}

function getSweepTabOptions() {
    return browser.storage.local.get({ sweepTabOptions: [] })
        .then(value => value.sweepTabOptions);
}

function storeSweepTabOptions(tabOptions) {
    return browser.storage.local.set({ sweepTabOptions: tabOptions });
}