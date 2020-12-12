const queryTabUrls = ['*://*.www.google.com/*', '*://*.stackoverflow.com/*'];
const onlyCurrentWindow = false;

function activateSweeper() {
    getWindowTabs(onlyCurrentWindow)
        .then(tabs => tabs.map(tab => tab.id))
        .then(tabIds => closeTabs(tabIds))
        .then(sweepSuccess, sweepError);
}

function getWindowTabs(currentWindowOnly) {
    let queryObj = { url: queryTabUrls }
    if (currentWindowOnly) {
        queryObj = { ...queryObj, currentWindow: true }
    }
    return browser.tabs.query(queryObj);
}

function closeTabs(tabIds) {
    browser.tabs.remove(tabIds);
    return tabIds.length;
}

function sweepSuccess(sweepCount) {
    const notificationOptions = {
        type: 'basic',
        message: `successfully swept ${sweepCount} tabs`,
        title: 'No problem!',
        iconUrl: 'icons/magic-sweeper-64.png'
    };
    browser.notifications.create(notificationOptions);
}

function sweepError(error) {
    console.error(error);
    const notificationOptions = {
        type: 'basic',
        message: `Something went terribly wrong 😕. you'll have to sweep by hand 😬`,
        title: 'Oops...',
        iconUrl: 'icons/magic-sweeper-64.png'
    };
    browser.notifications.create(notificationOptions);
}

browser.browserAction.onClicked.addListener(activateSweeper);
