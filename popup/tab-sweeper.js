function updateTabUrlsList(tabUrls) {
    /* update html list */
}

// listen for currentWindow changes
document.getElementById('current-window-option').addEventListener('change', (element) => {
    storeCurrentWindowValue(element.target.checked).then(
        updateBadge,
        (e) => console.error('unable to store currentWindowChecked', e)
    );
});

// listen for activateSweeper trigger
document.getElementById('sweep-button').addEventListener('click', activateSweeper);


function setCurrentWindowOption() {
    getCurrentWindowValue()
        .then(optionValue => {
            document.getElementById('current-window-option').checked = optionValue;
        });
}

function makeSweepTabOption(label, active, index) {
    console.log(label, active);
    return `
        <span>
            <input type="checkbox" id="${index}" checked="${active}">
            <label for="${index}">${label}</label>
        </span>
        </br>
    `
}

function setSweepTabOptions() {
    var wrapper = document.getElementById("sweep-tab-options-wrapper");

    let optionList = '';

    getSweepTabUrls()
        .then(sweepTabs => sweepTabs.map((sweepTab, i) => makeSweepTabOption(sweepTab.pattern, sweepTab.active, i)))
        .then(options => options.forEach(option => optionList += option))
        .then(_ => wrapper.innerHTML = optionList)
}

// set initial window values
setCurrentWindowOption();
setSweepTabOptions();
