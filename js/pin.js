class Pin {

	constructor(color, x, y, angle = 0) {
		this.initElement();
		this.setValue('');
		this.setColor(color);
		this.setPosition(x, y);
		this.setAngle(angle);
	}

	initElement() {
		this.pinElement = document.createElement('div');
		this.pinElement.classList.add('pin-clip-pin');

		this.pinInputElement = document.createElement('input');
		this.pinInputElement.classList.add('pin-clip-pin-input');

		this.pinNeedleElement = document.createElement('div');
		this.pinNeedleElement.classList.add('pin-clip-pin-needle');

		this.pinElement.appendChild(this.pinInputElement);
		this.pinElement.appendChild(this.pinNeedleElement);

		this.initEvent();
	}

	getElement() {
		return this.pinElement;
	}

	initEvent() {
		this._onPinDoubleClick = this.onPinDoubleClick.bind(this);
		this.pinElement.addEventListener('dblclick', this._onPinDoubleClick);

		this._onPinGrab = this.onPinGrab.bind(this);
		this._onPinRelease = this.onPinRelease.bind(this);
		this._onPinMove = this.onPinMove.bind(this);
		this.pinElement.addEventListener('mousedown', this._onPinGrab);
	}

	setColor(color) {
		this.color = color;
		this.pinElement.style.backgroundColor = this.color;
		this.pinInputElement.style.color = (this.color === 'white' ? '#222' : '#fff');
		this.pinNeedleElement.style.borderTopColor = this.color;
	}

	getColor() {
		return this.color;
	}

	setValue(value) {
		this.value = value;
		this.pinInputElement.value = this.value;
	}

	getValue() {
		return this.value;
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
		this.pinElement.style.left = `${x}px`;
		this.pinElement.style.top = `${y}px`;
	}

	getPosition() {
		return {
			x: this.x,
			y: this.y,
		};
	}

	setAngle(angle) {
		this.angle = angle;
		this.pinNeedleElement.style.transform = `rotate(${angle}rad)`;
	}

	getAngle() {
		return this.angle;
	}

	focus() {
		this.pinInputElement.focus();
	}

	onPinDoubleClick(event) {
		let deleteEvent = new CustomEvent('pin-delete', {
			bubbles: true,
			detail: {pin: this},
		});
		this.pinElement.dispatchEvent(deleteEvent);
	}

	onPinGrab(event) {
		document.addEventListener('mousemove', this._onPinMove);
		document.addEventListener('mouseup', this._onPinRelease);
	}

	onPinMove(event) {
		let origin = this.pinElement.parentElement;
		let x = event.pageX - origin.offsetLeft;
		let y = event.pageY - origin.offsetTop;

		this.setPosition(x, y);
	}

	onPinRelease(event) {
		document.removeEventListener('mousemove', this._onPinMove);
		document.removeEventListener('mouseup', this._onPinRelease);
	}

}