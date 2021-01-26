function updateSweepTabOptionsList(tabOptions) {
    var wrapper = document.getElementById("sweep-tab-options");
    var optionsList = '';

    if (tabOptions.length > 0) {
        optionsList = tabOptions
            .map((sweepTab, i) => makeSweepTabOption(sweepTab.url, sweepTab.active, i))
            .reduce((options = '', option) => options + option);
    }

    wrapper.innerHTML = optionsList;
    makeTabOptionChangeListeners();
    makeRemoveOptionClickListeners();
    updateBadge();
}

function addTabSweeperOption() {
    const newOptionEl = document.getElementById('add-option-input');

    return addSweepTabOption(newOptionEl.value)
        .catch(e => raiseError(e))
        .then(updateBadge)
        .then(_ => newOptionEl.value = '');
}

function makeSweepTabOption(label, active, index) {
    return `
        <span class="tab-option-wrapper">
            <input type="checkbox" class="tab-option-input" name="${label}" id="${index}" ${active ? 'checked' : null}>
            <label class="tab-option-label" for="${index}">${label}</label>
            <a class="tab-option-remove close-button" name="${label}"> &#215; </a>
        </span>
    `
}

function makeRemoveOptionClickListeners() {
    var tabOptions = document.getElementsByClassName('tab-option-remove');

    // listen for toggle tab-option activity
    for (var i = 0; i < tabOptions.length; i++) {
        tabOptions[i].addEventListener('click', removeTabOption);
    }
}

function removeTabOption(e) {
    removeSweepTabOption(e.target.name)
}

function makeTabOptionChangeListeners() {
    var tabOptions = document.getElementsByClassName('tab-option-input');

    // listen for toggle tab-option activity
    for (var i = 0; i < tabOptions.length; i++) {
        tabOptions[i].addEventListener('click', tabOptionChanged);
    }
}

function tabOptionChanged(event) {
    toggleSweepTabOption(event.target.name)
        .then(_ => {
            event.target.checked = !event.target.checked;
            updateBadge();
        });
}