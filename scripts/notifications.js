function sweepSuccessMsg(sweepCount) {
    const notificationOptions = {
        type: 'basic',
        message: `successfully swept ${sweepCount} tabs`,
        title: 'No problemo!',
        iconUrl: 'icons/magic-sweeper-64.png'
    };
    browser.notifications.create(notificationOptions);
}

function sweepErrorMsg(error) {
    console.error(error);
    const notificationOptions = {
        type: 'basic',
        message: `Something went terribly wrong 😕. You'll have to sweep by hand 😬`,
        title: 'Oops...',
        iconUrl: 'icons/magic-sweeper-64.png'
    };
    browser.notifications.create(notificationOptions);
}