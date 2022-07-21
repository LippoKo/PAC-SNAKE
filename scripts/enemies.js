class Enemies {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.vx = 2;
		this.vy = 2;
		this.width = 30;
		this.height = 30;
		this.enemyArray = [];

		// Load the image
		const img = new Image();
		img.addEventListener("load", () => {
			// Once image loaded => draw
			this.img = img;
			this.draw();
		});
		img.src = "./docs/assets/images/ghost2.png";
	}

	enemyMove() {
		this.x += this.vx;
		this.y += this.vy;
		if (this.y + this.vy > 600 || this.y + this.vy < 0) {
			this.vy *= -1;
		}
		if (this.x + this.vx > 600 || this.x + this.vx < 0) {
			this.vx *= -1;
		}
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

	draw = () => {
		ctx.drawImage(this.img, this.x, this.y, 30, 30);
	};

	crashWith(enemy) {
		return !(
			this.bottom() < enemy.top() ||
			this.top() > enemy.bottom() ||
			this.right() < enemy.left() ||
			this.left() > enemy.right()
		);
	}
}
