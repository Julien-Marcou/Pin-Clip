
browser.menus.create({
	id: 'add-pin',
	title: 'Ajouter une épingle',
	contexts: ['all'],
}, () => {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	}
});

browser.menus.onClicked.addListener((info, tab) => {

	browser.tabs.sendMessage(tab.id, {
		command: info.menuItemId
	});

});
