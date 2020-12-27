function updateSweepTabOptionsList(tabOptions) {
    var wrapper = document.getElementById("sweep-tab-options");

    optionsList = tabOptions
        .map((sweepTab, i) => makeSweepTabOption(sweepTab.url, sweepTab.active, i))
        .reduce((options = '', option) => options + option);

    wrapper.innerHTML = optionsList;
    makeTabOptionChangeListeners();
}

function addTabSweeperOption() {
    const newOptionEl = document.getElementById('add-option-input');
    console.log('add', newOptionEl.value);
    addSweepTabOption(newOptionEl.value)
        .then(updateBadge)
        .then(_ => newOptionEl.value = '');
    // removeSweepTabOption('www.google.com')
}

function makeSweepTabOption(label, active, index) {
    return `
        <span>
            <input type="checkbox" class="tab-option" name="${label}" id="${index}" ${active ? 'checked' : null}>
            <label for="${index}">${label}</label>
        </span>
        </br>
    `
}

function makeTabOptionChangeListeners() {
    var tabOptions = document.getElementsByClassName('tab-option');

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