(function() {

	if (window.hasRun) {
		return;
	}

	window.hasRun = true;

	const pinSize = 42;

	let contextMenuPosition = {x: 0, y: 0, source: null};

	function addPin(color) {
		let pin = document.createElement('div');
		pin.className = 'pin-clip-pin'
		pin.setAttribute('style', `background-color: ${color}; width: ${pinSize}px; height: ${pinSize}px; position: absolute; border-radius: ${pinSize}px; left: ${contextMenuPosition.x - (pinSize / 2)}px; top: ${contextMenuPosition.y - (pinSize / 2)}px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);`);
		pin.addEventListener('dblclick', (event) => {
			document.body.removeChild(pin);
		});
		pin.addEventListener('mousedown', (event) => {
			document.addEventListener('mousemove', movePin, true);
		});

		let input = document.createElement('input');
		input.setAttribute('style', `color: ${color === 'white' ? '#222' : '#fff'}; width: 100%; text-align: center; height: ${pinSize}px; line-height: ${pinSize}px; border: 0 none; background-color: transparent; font-weight: bold; font-size: 16px;`);

		pin.appendChild(input);
		document.body.appendChild(pin);

		input.focus();
	}

	function movePin(event) {
		let pin = event.target.parentElement;
		pin.style.left = `${event.clientX + window.scrollX - (pinSize / 2)}px`;
		pin.style.top = `${event.clientY  + window.scrollY - (pinSize / 2)}px`;
	}

	document.addEventListener('contextmenu', (event) => {
		contextMenuPosition.source = event.target;
		contextMenuPosition.x = event.clientX + window.scrollX;
		contextMenuPosition.y = event.clientY + window.scrollY;
	});

	document.addEventListener('mouseup', (event) => {
		document.removeEventListener('mousemove', movePin, true);
	});

	browser.runtime.onMessage.addListener((message) => {
		if (message.command === 'add-pin') {
			addPin(message.color);
		}
	});

})();
