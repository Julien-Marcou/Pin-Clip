
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

		this.initEvent();
	}

	getElement() {
		return this.overlayElement;
	}

	initEvent() {
		this._onPinDelete = this.onPinDelete.bind(this);
		this.overlayElement.addEventListener('pin-delete', this._onPinDelete);
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

}
