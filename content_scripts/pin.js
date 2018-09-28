(function() {

	if (window.hasRun) {
		return;
	}

	window.hasRun = true;

	const pinSize = 42;

	let contextMenuPosition = {x: 0, y: 0, source: null};
	let elementSelected = null;

	let overlay = document.createElement('div');
	overlay.classList.add('pin-clip-overlay');
	document.body.appendChild(overlay);

	function addPin(color) {
		let pin = document.createElement('div');
		pin.classList.add('pin-clip-pin');
		pin.setAttribute('style', `background-color: ${color}; width: ${pinSize}px; height: ${pinSize}px; position: absolute; border-radius: ${pinSize}px; left: ${contextMenuPosition.x - (pinSize / 2)}px; top: ${contextMenuPosition.y - (pinSize / 2)}px; filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.4));`);
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
		let pin = elementSelected;
		pin.style.left = `${event.clientX + window.scrollX - (pinSize / 2)}px`;
		pin.style.top = `${event.clientY  + window.scrollY - (pinSize / 2)}px`;
	}

	function moveNeedle(event) {
		let needle = elementSelected;
		let pin = needle.parentElement;

		let p1 = {
			x: pin.offsetLeft + (pinSize / 2),
			y: pin.offsetTop + (pinSize / 2)
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
	});

})();
