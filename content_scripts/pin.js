(function() {

	if (window.hasRun) {
		return;
	}

	window.hasRun = true;

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
		pin.style.backgroundColor = color;
		pin.style.left = `calc(50% + ${contextMenuPosition.x}px)`;
		pin.style.top = `${contextMenuPosition.y}px`;
		pin.addEventListener('dblclick', (event) => {
			overlay.removeChild(pin);
		});
		pin.addEventListener('mousedown', (event) => {
			elementSelected = event.target.parentElement;
			document.addEventListener('mousemove', movePin, true);
		});

		let needle = document.createElement('div');
		needle.classList.add('pin-clip-pin-needle');
		needle.style.borderTopColor = color;
		needle.addEventListener('mousedown', (event) => {
			event.preventDefault();
			event.stopPropagation();
			elementSelected = event.target;
			document.addEventListener('mousemove', moveNeedle, true);
		});

		let input = document.createElement('input');
		input.classList.add('pin-clip-pin-input');
		input.style.color = (color === 'white' ? '#222' : '#fff');

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
