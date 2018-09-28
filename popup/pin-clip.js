document.addEventListener('click', (event) => {
	if (event.target.classList.contains('toggle-overlay')) {

		browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {command: 'toggle-overlay'});
		});

	}
});
