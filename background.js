function onError() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	}
}

browser.menus.create({
	id: 'add-pin-red',
	title: 'Ajouter une puce rouge',
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-pin-green',
	title: 'Ajouter une puce verte',
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-pin-blue',
	title: 'Ajouter une puce bleue',
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-pin-black',
	title: 'Ajouter une puce noire',
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-pin-white',
	title: 'Ajouter une puce blanche',
	contexts: ['all'],
}, onError);

browser.menus.onClicked.addListener((info, tab) => {

	const addPinPrefix = 'add-pin-';

	if (info.menuItemId.indexOf(addPinPrefix) === 0) {
		browser.tabs.sendMessage(tab.id, {
			command: 'add-pin',
			color: info.menuItemId.substr(addPinPrefix.length)
		});
	}

});
