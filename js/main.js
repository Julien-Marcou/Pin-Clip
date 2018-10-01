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

	// function addPin(color, x, y) {
	// 	let pin = document.createElement('div');
	// 	pin.classList.add('pin-clip-pin');
	// 	pin.style.backgroundColor = color;
	// 	movePin(pin, x, y);
	// 	pin.addEventListener('dblclick', (event) => {
	// 		overlay.removeChild(pin);
	// 	});
	// 	pin.addEventListener('mousedown', (event) => {
	// 		elementSelected = event.target.parentElement;
	// 		document.addEventListener('mousemove', onPinDrag, true);
	// 	});

	// 	let needle = document.createElement('div');
	// 	needle.classList.add('pin-clip-pin-needle');
	// 	needle.style.borderTopColor = color;
	// 	needle.addEventListener('mousedown', (event) => {
	// 		event.preventDefault();
	// 		event.stopPropagation();
	// 		elementSelected = event.target;
	// 		document.addEventListener('mousemove', onNeedleDrag, true);
	// 	});

	// 	let input = document.createElement('input');
	// 	input.classList.add('pin-clip-pin-input');
	// 	input.style.color = (color === 'white' ? '#222' : '#fff');

	// 	pin.appendChild(needle);
	// 	pin.appendChild(input);
	// 	overlay.appendChild(pin);

	// 	input.focus();
	// }

	// function movePin(pin, x, y) {
	// 	pin.style.left = `${x}px`;
	// 	pin.style.top = `${y}px`;

	// 	if (xOriginCentered) {
	// 		pin.style.left = `calc(50% + ${x}px)`;
	// 	}
	// }

	// function rotateNeedle(needle, angle) {
	// 	needle.style.transform = `rotate(${angle}rad)`;
	// }

	// function onPinDrag(event) {
	// 	let pin = elementSelected;
	// 	let x = event.clientX + window.scrollX;
	// 	let y = event.clientY  + window.scrollY;

	// 	if (xOriginCentered) {
	// 		x -= (document.body.clientWidth/2);
	// 	}

	// 	movePin(pin, x, y);
	// }

	// function onNeedleDrag(event) {
	// 	let needle = elementSelected;
	// 	let pin = needle.parentElement;

	// 	let p1 = {
	// 		x: pin.offsetLeft,
	// 		y: pin.offsetTop
	// 	};
	// 	let p2 = {
	// 		x: event.clientX + window.scrollX,
	// 		y: event.clientY  + window.scrollY
	// 	};
	// 	let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) - (Math.PI / 2);

	// 	rotateNeedle(needle, angle);
	// }

	// document.addEventListener('mouseup', (event) => {
	// 	elementSelected = null;
	// 	document.removeEventListener('mousemove', onPinDrag, true);
	// 	document.removeEventListener('mousemove', onNeedleDrag, true);
	// });

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
