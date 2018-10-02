function onError() {
	if (browser.runtime.lastError) {
		console.error(`Error: ${browser.runtime.lastError}`);
	}
}

browser.menus.create({
	id: 'add-pin-red',
	title: browser.i18n.getMessage('addRedPin'),
	contexts: ['all'],
	icons: {
		'16': 'icons/pin-red.svg',
		'32': 'icons/pin-red.svg',
	},
}, onError);

browser.menus.create({
	id: 'add-pin-green',
	title: browser.i18n.getMessage('addGreenPin'),
	contexts: ['all'],
	icons: {
		'16': 'icons/pin-green.svg',
		'32': 'icons/pin-green.svg',
	},
}, onError);

browser.menus.create({
	id: 'add-pin-blue',
	title: browser.i18n.getMessage('addBluePin'),
	contexts: ['all'],
	icons: {
		'16': 'icons/pin-blue.svg',
		'32': 'icons/pin-blue.svg',
	},
}, onError);

browser.menus.create({
	id: 'add-pin-black',
	title: browser.i18n.getMessage('addBlackPin'),
	contexts: ['all'],
	icons: {
		'16': 'icons/pin-black.svg',
		'32': 'icons/pin-black.svg',
	},
}, onError);

browser.menus.create({
	id: 'add-pin-white',
	title: browser.i18n.getMessage('addWhitePin'),
	contexts: ['all'],
	icons: {
		'16': 'icons/pin-white.svg',
		'32': 'icons/pin-white.svg',
	},
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
	icons: {
		'16': 'icons/bracket-red.svg',
		'32': 'icons/bracket-red.svg',
	},
}, onError);

browser.menus.create({
	id: 'add-bracket-green',
	title: browser.i18n.getMessage('addGreenBracket'),
	contexts: ['all'],
	icons: {
		'16': 'icons/bracket-green.svg',
		'32': 'icons/bracket-green.svg',
	},
}, onError);

browser.menus.create({
	id: 'add-bracket-blue',
	title: browser.i18n.getMessage('addBlueBracket'),
	contexts: ['all'],
	icons: {
		'16': 'icons/bracket-blue.svg',
		'32': 'icons/bracket-blue.svg',
	},
}, onError);

browser.menus.create({
	id: 'add-bracket-black',
	title: browser.i18n.getMessage('addBlackBracket'),
	contexts: ['all'],
	icons: {
		'16': 'icons/bracket-black.svg',
		'32': 'icons/bracket-black.svg',
	},
}, onError);

browser.menus.create({
	id: 'add-bracket-white',
	title: browser.i18n.getMessage('addWhiteBracket'),
	contexts: ['all'],
	icons: {
		'16': 'icons/bracket-white.svg',
		'32': 'icons/bracket-white.svg',
	},
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
