function sweepSuccessMsg(sweepCount) {
    const notificationOptions = {
        type: 'basic',
        message: `Successfully swept ${sweepCount} tabs`,
        title: '🦾 No problemo!',
        iconUrl: 'icons/magic-sweeper-64.png',
        eventTime: 1500,
    };
    browser.notifications.create(notificationOptions);
}

function sweepErrorMsg(error) {
    console.error(error);
    const notificationOptions = {
        type: 'basic',
        message: `Something went wrong, you'll have to sweep by hand 😕`,
        title: '😬 Oops...',
        iconUrl: 'icons/magic-sweeper-64.png',
        eventTime: 1500,
    };
    browser.notifications.create(notificationOptions);
}

function raiseError(msg) {
    showErrorMessage(msg);
    setTimeout(hideErrorMessage, 3000);
    return Promise.reject(msg);
}