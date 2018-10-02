function queryActiveTab(command) {
	browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {command: command});
	});
}

document.addEventListener('click', (event) => {
	if (event.target.dataset.command) {
		queryActiveTab(event.target.dataset.command);
	}
});
