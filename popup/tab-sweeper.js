function updateSweepTabOptionsList() {
    var wrapper = document.getElementById("sweep-tab-options");

    getSweepTabOptions()
        .then(options => options.map((sweepTab, i) => makeSweepTabOption(sweepTab.url, sweepTab.active, i)))
        .then(options => options.reduce((options = '', option) => options + option))
        .then(optionsList => wrapper.innerHTML = optionsList);
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

// listen for toggle tab-option activity
document.getElementsByClassName('tab-option').addEventListener('change', (a) => {
    console.log('toggle', a)
})

// listen for add-option button
document.getElementById('add-option-button').addEventListener('click', addTabSweeperOption);

function addTabSweeperOption() {
    const newOptionValue = document.getElementById('add-option-input').value;
    console.log('add', newOptionValue);
    addSweepTabOption(newOptionValue)
        .then(updateBadge);
    // removeSweepTabOption('www.google.com')
}

function makeSweepTabOption(label, active, index) {
    console.log(label, active);
    return `
        <span>
            <input type="checkbox" class="tab-option" id="${index}" checked="${active}">
            <label for="${index}">${label}</label>
        </span>
        </br>
    `
}

function setSweepTabOptions() {
    getSweepTabOptions()
        .then(updateSweepTabOptionsList)
}

// set initial window values
setCurrentWindowOption();
setSweepTabOptions();
