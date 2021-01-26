function getSweepTabs() {
    const sweepTabPatterns = getSweepTabOptions()
        .then(urls => urls
            .filter(url => !!url.active)
            .map(url => url.pattern)
        );

    return Promise.all([sweepTabPatterns, getCurrentWindowValue()])
        .then(([sweepTabUrls, currentWindowActive]) => {
            let query = { url: sweepTabUrls }
            if (currentWindowActive) {
                query = { ...query, currentWindow: true }
            }
            return browser.tabs.query(query);
        });
}

function activateSweeper() {
    getSweepTabs()
        .then(tabs => tabs.map(tab => tab.id))
        .then(tabIds => closeTabs(tabIds))
        .then(sweepSuccessMsg, sweepErrorMsg);
}

function closeTabs(tabIds) {
    browser.tabs.remove(tabIds);
    return tabIds.length;
}

function updateBadge() {
    getSweepTabs()
        .then(tabs => tabs.length)
        .then(tabCount => {
            const badgeText = tabCount > 0 ? tabCount.toString() : '';
            browser.browserAction.setBadgeText({ text: badgeText });
        })
}
