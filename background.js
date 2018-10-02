function onError() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	}
}

browser.menus.create({
	id: 'add-pin-red',
	title: browser.i18n.getMessage('addRedPin'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-pin-green',
	title: browser.i18n.getMessage('addGreenPin'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-pin-blue',
	title: browser.i18n.getMessage('addBluePin'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-pin-black',
	title: browser.i18n.getMessage('addBlackPin'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-pin-white',
	title: browser.i18n.getMessage('addWhitePin'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'pin-bracket-seperator',
	type: 'separator',
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-bracket-red',
	title: browser.i18n.getMessage('addRedBracket'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-bracket-green',
	title: browser.i18n.getMessage('addGreenBracket'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-bracket-blue',
	title: browser.i18n.getMessage('addBlueBracket'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-bracket-black',
	title: browser.i18n.getMessage('addBlackBracket'),
	contexts: ['all'],
}, onError);

browser.menus.create({
	id: 'add-bracket-white',
	title: browser.i18n.getMessage('addWhiteBracket'),
	contexts: ['all'],
}, onError);

browser.menus.onClicked.addListener((info, tab) => {

	const addPinPrefix = 'add-pin-';
	const addBracketPrefix = 'add-bracket-';

	if (info.menuItemId.indexOf(addPinPrefix) === 0) {
		browser.tabs.sendMessage(tab.id, {
			command: 'add-pin',
			color: info.menuItemId.substr(addPinPrefix.length)
		});
	}
	else if (info.menuItemId.indexOf(addBracketPrefix) === 0) {
		browser.tabs.sendMessage(tab.id, {
			command: 'add-bracket',
			color: info.menuItemId.substr(addBracketPrefix.length)
		});
	}

});
