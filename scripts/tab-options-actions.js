function addSweepTabOption(url) {
    const cleanUrl = sanitizeUrl(url);

    if (cleanUrl) {
        const urlMatchPattern = makeMatchPattern(cleanUrl);

        return getSweepTabOptions()
            .then(sweepTabOptions => {
                sweepTabOptions.push({
                    url,
                    pattern: urlMatchPattern,
                    active: true
                })
                return sweepTabOptions;
            })
            .then(storeSweepTabOptions)
            .then(getSweepTabOptions)
            .then(updateSweepTabOptionsList)
    } else {
        return Promise.reject('value is not a valid url...');
    }
}

function sanitizeUrl(url) {
    if (url.trim() === '') {
        return undefined;
    }
    if (!url.includes('.')) {
        return undefined;
    }
    return url.trim();
}

function makeMatchPattern(url) {
    //TODO make this work good...
    // const sliceWww = url.split('www.').pop();
    return `*://*.${url}/*`;
}

function removeSweepTabOption(url) {
    return getSweepTabOptions()
        .then(sweepTabOptions => sweepTabOptions.filter(option => option.url !== url))
        .then(storeSweepTabOptions)
        .then(getSweepTabOptions)
        .then(updateSweepTabOptionsList)
}

function toggleSweepTabOption(url) {
    return getSweepTabOptions()
        .then(sweepTabOptions => {
            tabIndex = sweepTabOptions.findIndex(option => option.url === url);
            sweepTabOptions[tabIndex].active = !sweepTabOptions[tabIndex].active;
            return sweepTabOptions;
        })
        .then(storeSweepTabOptions)
        .then(getSweepTabOptions)
        .then(updateSweepTabOptionsList)
}