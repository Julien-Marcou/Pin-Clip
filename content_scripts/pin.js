(function() {

	if (window.hasRun) {
		return;
	}

	window.hasRun = true;

	const pinSize = 42;

	const xOriginCentered = true;

	let contextMenuPosition = {x: 0, y: 0, source: null};
	let elementSelected = null;

	let overlay = document.createElement('div');
	overlay.classList.add('pin-clip-overlay', 'pin-clip-overlay-hidden');
	document.body.appendChild(overlay);

	function toggleOverlay() {
		if (overlay.classList.contains('pin-clip-overlay-hidden')) {
			overlay.classList.remove('pin-clip-overlay-hidden');
		}
		else {
			overlay.classList.add('pin-clip-overlay-hidden');
		}
	}

	function addPin(color) {
		let pin = document.createElement('div');
		pin.classList.add('pin-clip-pin');
		pin.setAttribute('style', `background-color: ${color}; width: ${pinSize}px; height: ${pinSize}px; position: absolute; border-radius: ${pinSize}px; left: calc(50% + ${contextMenuPosition.x}px); top: ${contextMenuPosition.y}px; transform: translate(-50%, -50%); filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.4));`);
		pin.addEventListener('dblclick', (event) => {
			overlay.removeChild(pin);
		});
		pin.addEventListener('mousedown', (event) => {
			elementSelected = event.target.parentElement;
			document.addEventListener('mousemove', movePin, true);
		});

		let needle = document.createElement('div');
		needle.setAttribute('style', `border-width: ${pinSize}px ${pinSize / 3}px 0 ${pinSize / 3}px; border-color: ${color} transparent transparent transparent; border-style: solid; width: 0; height: 0; position: absolute; top: ${pinSize / 2}px; left: ${pinSize / 6}px; transform-origin: center top;`);
		needle.addEventListener('mousedown', (event) => {
			event.preventDefault();
			event.stopPropagation();
			elementSelected = event.target;
			document.addEventListener('mousemove', moveNeedle, true);
		});

		let input = document.createElement('input');
		input.setAttribute('style', `color: ${color === 'white' ? '#222' : '#fff'}; width: 100%; text-align: center; height: ${pinSize}px; line-height: ${pinSize}px; border-radius: ${pinSize}px; border: 0 none; background-color: transparent; font-weight: bold; font-size: 16px; position: absolute; top: 0; left: 0;`);

		pin.appendChild(needle);
		pin.appendChild(input);
		overlay.appendChild(pin);

		input.focus();
	}

	function movePin(event) {
		let mouseXPosition = event.clientX + window.scrollX;
		let mouseYPosition = event.clientY  + window.scrollY;

		if (xOriginCentered) {
			mouseXPosition -= (document.body.clientWidth/2);
		}

		let pin = elementSelected;
		pin.style.left = `calc(50% + ${mouseXPosition}px)`;
		pin.style.top = `${mouseYPosition}px`;
	}

	function moveNeedle(event) {
		let needle = elementSelected;
		let pin = needle.parentElement;

		let p1 = {
			x: pin.offsetLeft,
			y: pin.offsetTop
		};
		let p2 = {
			x: event.clientX + window.scrollX,
			y: event.clientY  + window.scrollY
		};
		var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) - (Math.PI / 2);

		needle.style.transform = `rotate(${angle}rad)`;
	}

	document.addEventListener('contextmenu', (event) => {
		contextMenuPosition.source = event.target;
		contextMenuPosition.x = event.clientX + window.scrollX;
		contextMenuPosition.y = event.clientY + window.scrollY;

		if (xOriginCentered) {
			contextMenuPosition.x -= (document.body.clientWidth/2);
		}
	});

	document.addEventListener('mouseup', (event) => {
		elementSelected = null;
		document.removeEventListener('mousemove', movePin, true);
		document.removeEventListener('mousemove', moveNeedle, true);
	});

	browser.runtime.onMessage.addListener((message) => {
		if (message.command === 'add-pin') {
			addPin(message.color);
		}
		else if (message.command === 'toggle-overlay') {
			toggleOverlay();
		}
	});

})();
