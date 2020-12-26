function addSweepTabOption(url) {
    const urlMatchPattern = makeMatchPattern(url);

    getSweepTabOptions()
        .then(sweepTabOptions => {
            sweepTabOptions.push({
                url,
                pattern: urlMatchPattern,
                active: true
            })
            return sweepTabOptions;
        })
        .then(storeSweepTabOptions)
        .then(updateSweepTabOptionsList)
}

function makeMatchPattern(url) {
    //TODO make this work good...
    const sliceWww = url.split('www').pop();
    return `*://*.${sliceWww}/*`;
}

function removeSweepTabOption(url) {
    getSweepTabOptions()
        .then(sweepTabOptions => sweepTabOptions.filter(option => option.url === url))
        .then(storeSweepTabOptions)
        .then(updateSweepTabOptionsList)
}

function toggleSweepTabOption(url) {
    getSweepTabOptions()
        .then(sweepTabOptions => {
            tabIndex = sweepTabOptions.findIndex(option => option.url === url);
            sweepTabOptions[tabIndex].active = !sweepTabOptions[tabIndex].active;
            return sweepTabOptions;
        })
        .then(storeSweepTabOptions)
        .then(updateSweepTabOptionsList)
}