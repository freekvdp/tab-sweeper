function addSweepTabUrl(url) {
    const urlMatchPattern = makeMatchPattern(url);

    getSweepTabUrls()
        .then(sweepTabUrls => {
            sweepTabUrls.push({
                pattern: urlMatchPattern,
                active: true
            })
            return sweepTabUrls;
        })
        .then(storeUpdatedTabUrls)
        .then(updateTabUrlsList)
}

function makeMatchPattern(url) {
    const sliceWww = url.split('www').pop();
    return `*://*.${sliceWww}/*`;
}

function removeSweepTabUrl(pattern) {
    getSweepTabUrls()
        .then(sweepTabUrls => sweepTabUrls.filter(url => url.pattern === pattern))
        .then(storeUpdatedTabUrls)
        .then(updateTabUrlsList)
}

function toggleSweepTabUrl(pattern) {
    getSweepTabUrls()
        .then(sweepTabUrls => {
            tabIndex = sweepTabUrls.findIndex(url => url.pattern === pattern);
            sweepTabUrls[tabIndex].active = !sweepTabUrls[tabIndex].active;
            return sweepTabUrls;
        })
        .then(storeUpdatedTabUrls)
        .then(updateTabUrlsList)
}