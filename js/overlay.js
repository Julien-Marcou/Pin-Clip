
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
	}

	initElement() {
		this.overlayElement = document.createElement('div');
		this.overlayElement.classList.add('pin-clip-overlay');

		this.overlayOriginElement = document.createElement('div');
		this.overlayOriginElement.classList.add('pin-clip-overlay-origin');
		
		this.overlayElement.appendChild(this.overlayOriginElement);
	}

	getElement() {
		return this.overlayElement;
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
		pin.renderIn(this.overlayOriginElement);
	}

	removePin(pin) {
		let pinIndex = this.pins.indexOf(pin);
		this.pins.splice(pinIndex, 1);
		pin.destroyFrom(this.overlayOriginElement);
	}

	renderIn(bodyElement) {
		bodyElement.appendChild(this.overlayElement);
	}

	destroyFrom(bodyElement) {
		bodyElement.removeChild(this.overlayElement);
	}

}
