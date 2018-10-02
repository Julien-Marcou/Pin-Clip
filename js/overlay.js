
const OverlayOrigin = {
	Left: 'left',
	Center: 'center',
	Right: 'right',
}

class Overlay {

	constructor(xOrigin = OverlayOrigin.Center) {
		this.initElement();
		this.hide();
		this.setXOrigin(xOrigin);
		this.pins = [];
		this.brackets = [];
	}

	initElement() {
		this.overlayElement = document.createElement('div');
		this.overlayElement.classList.add('pin-clip-overlay');

		this.overlayOriginElement = document.createElement('div');
		this.overlayOriginElement.classList.add('pin-clip-overlay-origin');

		this.overlayElement.appendChild(this.overlayOriginElement);

		this.initEvent();
	}

	getElement() {
		return this.overlayElement;
	}

	initEvent() {
		this._onPinDelete = this.onPinDelete.bind(this);
		this.overlayElement.addEventListener('pin-delete', this._onPinDelete);

		this._onBracketDelete = this.onBracketDelete.bind(this);
		this.overlayElement.addEventListener('bracket-delete', this._onBracketDelete);
	}

	setXOrigin(xOrigin) {
		this.xOrigin = xOrigin;
		switch (this.xOrigin) {
			case OverlayOrigin.Left:
				this.overlayOriginElement.style.left = '0';
				break;
			case OverlayOrigin.Center:
				this.overlayOriginElement.style.left = '50%';
				break;
			case OverlayOrigin.Right:
				this.overlayOriginElement.style.left = '100%';
				break;
		}
	}

	getXOrigin() {
		return this.xOrigin;
	}

	getOriginPosition() {
		return {
			x: this.overlayOriginElement.offsetLeft,
			y: this.overlayOriginElement.offsetTop,
		};
	}

	hide() {
		this.hidden = true;
		this.overlayElement.classList.add('pin-clip-overlay-hidden');
	}

	show() {
		this.hidden = false;
		this.overlayElement.classList.remove('pin-clip-overlay-hidden');
	}

	isHidden() {
		return this.hidden;
	}

	addPin(pin) {
		this.pins.push(pin);

		this.overlayOriginElement.appendChild(pin.getElement());

		if (this.isHidden()) {
			this.show();
		}

		pin.focus();
	}

	removePin(pin) {
		let pinIndex = this.pins.indexOf(pin);
		this.pins.splice(pinIndex, 1);

		this.overlayOriginElement.removeChild(pin.getElement());
	}

	onPinDelete(event) {
		this.removePin(event.detail.pin);
	}

	addBracket(bracket) {
		this.brackets.push(bracket);

		this.overlayOriginElement.appendChild(bracket.getElement());

		if (this.isHidden()) {
			this.show();
		}
	}

	removeBracket(bracket) {
		let bracketIndex = this.brackets.indexOf(bracket);
		this.brackets.splice(bracketIndex, 1);

		this.overlayOriginElement.removeChild(bracket.getElement());
	}

	onBracketDelete(event) {
		this.removeBracket(event.detail.bracket);
	}

	serialize() {
		return {
			hidden: this.hidden,
			xOrigin: this.xOrigin,
			pins: this.pins.map(pin => pin.serialize()),
			brackets: this.brackets.map(bracket => bracket.serialize()),
		};
	}

	static unserialize(serializedOverlay) {
		let overlay = new Overlay();

		overlay.setXOrigin(serializedOverlay.xOrigin);

		for (let serializedPin of serializedOverlay.pins) {
			let pin = Pin.unserialize(serializedPin);
			overlay.addPin(pin);
		}

		for (let serializedBracket of serializedOverlay.brackets) {
			let bracket = Bracket.unserialize(serializedBracket);
			overlay.addBracket(bracket);
		}

		// Hide/show overlay at the and, as adding pins and/or brackets will change the visiblity of the overlay
		if (serializedOverlay.hidden) {
			overlay.hide();
		}
		else {
			overlay.show();
		}

		return overlay;
	}

}
