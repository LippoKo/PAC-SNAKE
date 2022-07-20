class Enemies {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = 40;
		this.height = 40;
		this.enemyArray = [];

		// Load the image
		const img = new Image();
		img.addEventListener("load", () => {
			// Once image loaded => draw
			this.img = img;
			this.draw();
		});
		img.src = "/docs/assets/images/giphy.gif";
	}
	left() {
		return this.x;
	}

	right() {
		return this.x + this.width;
	}

	top() {
		return this.y;
	}

	bottom() {
		return this.y + this.height;
	}

	draw() {
		ctx.drawImage(this.img, this.x, this.y, 40, 40);
	}
}
