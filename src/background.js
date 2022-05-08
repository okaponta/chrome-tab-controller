chrome.commands.onCommand.addListener(async (command) => {
  console.log(command);
  move();
});

async function move() {
  let curTab = await getCurrentTab();

  try {
    await chrome.tabs.move(curTab.id, { index: 0 });
    console.log("Success.");
  } catch (error) {
    if (
      error ==
      "Error: Tabs cannot be edited right now (user may be dragging a tab)."
    ) {
      setTimeout(() => move(), 50);
    }
  }
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
