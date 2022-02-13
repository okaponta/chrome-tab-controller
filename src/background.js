chrome.tabs.onActivated.addListener(() => move());

async function move() {
    console.log('test');
    let curTab = await getCurrentTab();
    console.log(curTab);
    console.log(curTab.id);

    try {
        await chrome.tabs.move(curTab.id, { index: 0 });
        console.log('Success.');
    } catch (error) {
        if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
            setTimeout(() => move(), 50);
        }
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}