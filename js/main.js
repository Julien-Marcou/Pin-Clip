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
		else if (message.command === 'toggle-overlay') {
			if (overlay.isHidden()) {
				overlay.show();
			}
			else {
				overlay.hide();
			}
		}
	});

})();
