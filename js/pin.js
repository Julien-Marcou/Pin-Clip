class Pin {

	constructor(color = 'red', x = 0, y = 0, angle = 0) {
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
		this._onInputChange = this.onInputChange.bind(this);
		this.pinInputElement.addEventListener('change', this._onInputChange);

		this._onPinClick = this.onPinClick.bind(this);
		this.pinElement.addEventListener('click', this._onPinClick);

		this._onPinDoubleClick = this.onPinDoubleClick.bind(this);
		this.pinElement.addEventListener('dblclick', this._onPinDoubleClick);

		this._onPinGrab = this.onPinGrab.bind(this);
		this._onPinRelease = this.onPinRelease.bind(this);
		this._onPinMove = this.onPinMove.bind(this);
		this.pinElement.addEventListener('mousedown', this._onPinGrab);

		this._onNeedleGrab = this.onNeedleGrab.bind(this);
		this._onNeedleRelease = this.onNeedleRelease.bind(this);
		this._onNeedleMove = this.onNeedleMove.bind(this);
		this.pinNeedleElement.addEventListener('mousedown', this._onNeedleGrab);
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

	onPinClick(event) {
		this.focus();
	}

	onPinDoubleClick(event) {
		let deleteEvent = new CustomEvent('pin-delete', {
			bubbles: true,
			detail: {pin: this},
		});
		this.pinElement.dispatchEvent(deleteEvent);
	}

	onInputChange(event) {
		this.setValue(this.pinInputElement.value);
	}

	onPinGrab(event) {
		event.preventDefault();
		event.stopPropagation();
		document.addEventListener('mousemove', this._onPinMove);
		document.addEventListener('mouseup', this._onPinRelease);
	}

	onNeedleGrab(event) {
		event.preventDefault();
		event.stopPropagation();
		document.addEventListener('mousemove', this._onNeedleMove);
		document.addEventListener('mouseup', this._onNeedleRelease);
	}

	onPinMove(event) {
		let origin = this.pinElement.parentElement;
		let x = event.pageX - origin.offsetLeft;
		let y = event.pageY - origin.offsetTop;

		this.setPosition(x, y);
	}

	onNeedleMove(event) {
		let origin = this.pinElement.parentElement;
		let x1 = this.pinElement.offsetLeft;
		let y1 = this.pinElement.offsetTop;
		let x2 = event.pageX - origin.offsetLeft;
		let y2 = event.pageY - origin.offsetTop;

		let angle = Math.atan2(y2 - y1, x2 - x1) - (Math.PI / 2);

		this.setAngle(angle);
	}

	onPinRelease(event) {
		document.removeEventListener('mousemove', this._onPinMove);
		document.removeEventListener('mouseup', this._onPinRelease);
	}

	onNeedleRelease(event) {
		document.removeEventListener('mousemove', this._onNeedleMove);
		document.removeEventListener('mouseup', this._onNeedleRelease);
	}

	serialize() {
		return {
			value: this.value,
			color: this.color,
			x: this.x,
			y: this.y,
			angle: this.angle,
		};
	}

	static unserialize(serializedPin) {
		let pin = new Pin();

		pin.setValue(serializedPin.value);
		pin.setColor(serializedPin.color);
		pin.setPosition(serializedPin.x, serializedPin.y);
		pin.setAngle(serializedPin.angle);

		return pin;
	}

}