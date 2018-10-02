function queryActiveTab(command, data = null) {
	browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {command: command, data: data});
	});
}

let fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (event) => {
	if (fileInput.files.length > 0) {
		queryActiveTab('import-data', {file: fileInput.files[0]});
	}
});

document.addEventListener('click', (event) => {
	let command = event.target.dataset.command;
	if (command) {
		if (command === 'import-data') {
			fileInput.click();
		}
		else {
			queryActiveTab(command);
		}
	}
});
