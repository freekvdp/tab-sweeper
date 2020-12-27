const currentWindowOptionEl = document.getElementById('current-window-option');

// listen for currentWindow changes
currentWindowOptionEl.addEventListener('change', (element) => {
    storeCurrentWindowValue(element.target.checked)
        .then(
            updateBadge,
            (e) => console.error('unable to store currentWindowChecked', e)
        )
        .then(setCurrentWindowOptionLabel);
});

function setCurrentWindowOptionLabel() {
    var label = 'All windows';
    if (currentWindowOptionEl.checked) {
        label = 'Current window only';
    }
    document.getElementById('current-window-option-label').innerHTML = label;
}

// listen for activateSweeper trigger
document.getElementById('sweep-button').addEventListener('click', activateSweeper);

function setCurrentWindowOption() {
    getCurrentWindowValue()
        .then(optionValue => {
            currentWindowOptionEl.checked = optionValue;
            setCurrentWindowOptionLabel();
        });
}

// listen for add-option button
document.getElementById('add-option-button').addEventListener('click', addTabSweeperOption);

function setSweepTabOptions() {
    getSweepTabOptions()
        .then(updateSweepTabOptionsList)
}

// set initial window values
setCurrentWindowOption();
setSweepTabOptions();
