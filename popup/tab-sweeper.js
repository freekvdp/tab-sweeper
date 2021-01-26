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

// listen for trigger-add-option click
document.getElementById('trigger-add-option').addEventListener('click', showTabSweeperOption);

function showTabSweeperOption() {
    document.getElementById('trigger-add-option').classList.add("hidden");
    document.getElementById('add-option-wrapper').classList.add("show");
}

function hideTabSweeperOption() {
    document.getElementById('trigger-add-option').classList.remove("hidden");
    document.getElementById('add-option-wrapper').classList.remove("show");
}

// listen for add-option button
document.getElementById('add-option-button').addEventListener('click', function () {
    addTabSweeperOption()
        .then(hideTabSweeperOption);
});

// listen for add-option-close button
document.getElementById('add-option-close').addEventListener('click', function () {
    hideTabSweeperOption();  
})

// show error
function showErrorMessage(message) {
    document.getElementById('error-message').innerHTML = message;
}

function hideErrorMessage() {
    document.getElementById('error-message').innerHTML = '';
}

function setSweepTabOptions() {
    getSweepTabOptions()
        .then(updateSweepTabOptionsList);
}

// set initial window values
setCurrentWindowOption();
setSweepTabOptions();
