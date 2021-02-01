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
                query = {...query, currentWindow: true }
            }
            return browser.tabs.query(query);
        });
}

function getSweepTabsWithCount() {
    return Promise.all([getSweepTabOptions(), getCurrentWindowValue()])
        .then(([options, currentWindowActive]) => {
            let tabCount = 0;
            const optionsWithCount = options.map(option => {
                let query = { url: option.pattern }
                if (currentWindowActive) {
                    query = {...query, currentWindow: true }
                }
                return browser.tabs.query(query)
                    .then(tabs => {
                        tabCount += tabs.length;
                        return {...option, count: tabs.length };
                    })
            })
            return Promise.allSettled(optionsWithCount)
                .then(options => options.map(o => o.value))
                .then(optionsWC => ({ tabOptions: [].concat(...optionsWC), tabCount }))
        });
}

function activateSweeper() {
    getSweepTabs()
        .then(tabs => tabs.map(tab => tab.id))
        .then(tabIds => closeTabs(tabIds))
        .then(sweepSuccessMsg, sweepErrorMsg)
}

function closeTabs(tabIds) {
    browser.tabs.remove(tabIds);
    return tabIds.length;
}

function updateBadge() {
    getSweepTabsWithCount()
        .then(({ tabOptions, tabCount }) => {
            const badgeText = tabCount > 0 ? tabCount.toString() : '';
            browser.browserAction.setBadgeText({ text: badgeText });
            console.log('lala', tabOptions);
            return tabOptions
        })
        .then(updateSweepTabOptionsList)
}