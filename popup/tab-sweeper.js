document.getElementById('sweep-button').addEventListener('click', activateSweeper);

function activateSweeper() {
    getWindowTabs()
        .then(tabs => tabs.map(tab => tab.id))
        .then(tabIds => closeTabs(tabIds))
        .then(sweepSuccess, sweepError);
}

function closeTabs(tabIds) {
    browser.tabs.remove(tabIds);
    return tabIds.length;
}
