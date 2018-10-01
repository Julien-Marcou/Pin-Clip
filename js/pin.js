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
	}

	getElement() {
		return this.pinElement;
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

}