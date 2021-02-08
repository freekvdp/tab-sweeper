document.getElementById('donation-qr').addEventListener("click", function() {
    browser.tabs.create({
        url: 'https://bunq.me/tabsweeper',
        active: true
    })
});