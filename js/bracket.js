class Bracket {

	constructor(color, x, y, size = 160, angle = 0) {
		this.initElement();
		this.setColor(color);
		this.setPosition(x, y);
		this.setSize(size);
		this.setAngle(angle);
	}

	initElement() {
		this.bracketElement = document.createElement('div');
		this.bracketElement.classList.add('pin-clip-bracket');

		this.bracketTopTipElement = document.createElement('div');
		this.bracketTopTipElement.classList.add('pin-clip-bracket-top-tip');

		this.bracketBottomTipElement = document.createElement('div');
		this.bracketBottomTipElement.classList.add('pin-clip-bracket-bottom-tip');

		this.bracketElement.appendChild(this.bracketTopTipElement);
		this.bracketElement.appendChild(this.bracketBottomTipElement);

		this.initEvent();
	}

	getElement() {
		return this.bracketElement;
	}

	initEvent() {
		this._onBracketDoubleClick = this.onBracketDoubleClick.bind(this);
		this.bracketElement.addEventListener('dblclick', this._onBracketDoubleClick);

		this._onBracketGrab = this.onBracketGrab.bind(this);
		this._onBracketRelease = this.onBracketRelease.bind(this);
		this._onBracketMove = this.onBracketMove.bind(this);
		this.bracketElement.addEventListener('mousedown', this._onBracketGrab);

		this._onTopTipGrab = this.onTopTipGrab.bind(this);
		this._onTopTipRelease = this.onTopTipRelease.bind(this);
		this._onTopTipMove = this.onTopTipMove.bind(this);
		this.bracketTopTipElement.addEventListener('mousedown', this._onTopTipGrab);

		this._onBottomTipGrab = this.onBottomTipGrab.bind(this);
		this._onBottomTipRelease = this.onBottomTipRelease.bind(this);
		this._onBottomTipMove = this.onBottomTipMove.bind(this);
		this.bracketBottomTipElement.addEventListener('mousedown', this._onBottomTipGrab);
	}

	setColor(color) {
		this.color = color;
		this.bracketElement.style.backgroundColor = this.color;
		this.bracketTopTipElement.style.backgroundColor = this.color;
		this.bracketBottomTipElement.style.backgroundColor = this.color;
	}

	getColor() {
		return this.color;
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
		this.bracketElement.style.left = `${x}px`;
		this.bracketElement.style.top = `${y}px`;
	}

	getPosition() {
		return {
			x: this.x,
			y: this.y,
		};
	}

	setAngle(angle) {
		this.angle = angle;
		this.bracketElement.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
	}

	getAngle() {
		return this.angle;
	}

	setSize(size) {
		this.size = size;
		this.bracketElement.style.height = `${size}px`;
	}

	getSize() {
		return this.size;
	}

	onBracketDoubleClick(event) {
		let deleteEvent = new CustomEvent('bracket-delete', {
			bubbles: true,
			detail: {bracket: this},
		});
		this.bracketElement.dispatchEvent(deleteEvent);
	}

	onBracketGrab(event) {
		event.preventDefault();
		event.stopPropagation();
		document.addEventListener('mousemove', this._onBracketMove);
		document.addEventListener('mouseup', this._onBracketRelease);
	}

	onTopTipGrab(event) {
		event.preventDefault();
		event.stopPropagation();
		document.addEventListener('mousemove', this._onTopTipMove);
		document.addEventListener('mouseup', this._onTopTipRelease);
	}

	onBottomTipGrab(event) {
		event.preventDefault();
		event.stopPropagation();
		document.addEventListener('mousemove', this._onBottomTipMove);
		document.addEventListener('mouseup', this._onBottomTipRelease);
	}

	onBracketMove(event) {
		let origin = this.bracketElement.parentElement;
		let x = event.pageX - origin.offsetLeft;
		let y = event.pageY - origin.offsetTop;

		this.setPosition(x, y);
	}

	onTopTipMove(event) {
		let origin = this.bracketElement.parentElement;
		let x1 = this.bracketElement.offsetLeft;
		let y1 = this.bracketElement.offsetTop;
		let x2 = event.pageX - origin.offsetLeft;
		let y2 = event.pageY - origin.offsetTop;

		let angle = Math.atan2(y2 - y1, x2 - x1) + (Math.PI / 2);

		this.setAngle(angle);
	}

	onBottomTipMove(event) {
		let origin = this.bracketElement.parentElement;
		let x1 = this.bracketElement.offsetLeft;
		let y1 = this.bracketElement.offsetTop;
		let x2 = event.pageX - origin.offsetLeft;
		let y2 = event.pageY - origin.offsetTop;

		let xDiff = x2 - x1;
		let yDiff = y2 - y1;
		let size = Math.sqrt(xDiff*xDiff + yDiff*yDiff) * 2;
		if (size < 10) {
			size = 10;
		}

		this.setSize(size);
	}

	onBracketRelease(event) {
		document.removeEventListener('mousemove', this._onBracketMove);
		document.removeEventListener('mouseup', this._onBracketRelease);
	}

	onTopTipRelease(event) {
		document.removeEventListener('mousemove', this._onTopTipMove);
		document.removeEventListener('mouseup', this._onTopTipRelease);
	}

	onBottomTipRelease(event) {
		document.removeEventListener('mousemove', this._onBottomTipMove);
		document.removeEventListener('mouseup', this._onBottomTipRelease);
	}

	serialize() {
		return {
			color: this.color,
			x: this.x,
			y: this.y,
			size: this.size,
			angle: this.angle,
		};
	}

	static unserialize(serializedBracket) {
		let bracket = new Bracket('red', 0, 0);

		bracket.setColor(serializedBracket.color);
		bracket.setPosition(serializedBracket.x, serializedBracket.y);
		bracket.setSize(serializedBracket.size);
		bracket.setAngle(serializedBracket.angle);

		return bracket;
	}

}