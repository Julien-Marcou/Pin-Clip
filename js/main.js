(function() {

	if (window.hasRun) {
		return;
	}

	window.hasRun = true;

	let contextMenuPosition = {
		x: 0,
		y: 0,
	};

	let overlay = new Overlay();
	document.body.appendChild(overlay.getElement());

	document.addEventListener('contextmenu', (event) => {
		let originPosition = overlay.getOriginPosition();
		contextMenuPosition.x = event.pageX - originPosition.x;
		contextMenuPosition.y = event.pageY - originPosition.y;
	});

	browser.runtime.onMessage.addListener((message) => {
		if (message.command === 'add-pin') {
			let pin = new Pin(message.color, contextMenuPosition.x, contextMenuPosition.y);
			overlay.addPin(pin);
		}
		else if (message.command === 'add-bracket') {
			let bracket = new Bracket(message.color, contextMenuPosition.x, contextMenuPosition.y);
			overlay.addBracket(bracket);
		}
		else if (message.command === 'toggle-overlay') {
			if (overlay.isHidden()) {
				overlay.show();
			}
			else {
				overlay.hide();
			}
		}
		else if (message.command === 'export-data') {
			let data = JSON.stringify(overlay.serialize());
			let filename = window.location + '.json';
			let file = new File([data], filename, {type: 'application/json'});

			let downloadLink = document.createElement('a');
			downloadLink.href = window.URL.createObjectURL(file);
			downloadLink.download = filename;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
		else if (message.command === 'import-data') {
			let reader = new FileReader();
			reader.readAsText(message.data.file);
			reader.addEventListener('loadend', (event) => {
				document.body.removeChild(overlay.getElement());

				let data = JSON.parse(reader.result);
				overlay = Overlay.unserialize(data);

				document.body.appendChild(overlay.getElement());
			});
		}
	});

})();
