class Enemies {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.enemyArray = [];

		// Load the image
		const img = new Image();
		img.addEventListener("load", () => {
			// Once image loaded => draw
			this.img = img;
			this.draw();
		});
		img.src = "/project-1/docs/assets/images/giphy.gif";
	}

	updateEnemy = () => {
		for (let i = 0; i < this.enemyArray.length; i++) {
			this.enemyArray[i].draw();
		}

		this.frames++;

		if (this.frames % 80 === 0) {
			this.enemyArray.push(
				new Enemies(
					Math.floor(Math.random() * this.width),
					Math.floor(Math.random() * this.height)
				)
			);
		}
	};

	draw() {
		ctx.drawImage(this.img, this.x, this.y, 20, 20);
	}
}
