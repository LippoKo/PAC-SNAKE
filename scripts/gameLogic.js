class Game {
	constructor(ctx, width, height, snake) {
		this.frames = 0;
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.snake = snake;
		this.foodArray = [];
		this.enemyArray = [];
		this.trail = [];
		this.tail = 5;
		this.interval = null;
		this.isRunning = false;
	}

	start() {
		this.interval = setInterval(this.updateGameArea, 20);
		this.isRunning = true;
	}

	reset = () => {
		this.snake.x = 0;
		this.snake.y = 110;
		this.frames = 0;
		this.foodArray = [];
		this.enemyArray = [];
		this.start();
	};

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	stop() {
		clearInterval(this.interval);
		this.isRunning = false;
	}

	updateFood() {
		for (let i = 0; i < this.foodArray.length; i++) {
			this.foodArray[i].draw();
		}

		this.frames++;

		if (this.frames % 100 === 0) {
			this.foodArray.push(
				new Component(
					20,
					20,
					"green",
					Math.floor(Math.random() * this.width),
					Math.floor(Math.random() * this.height),
					this.ctx
				)
			);
		}
	}

	checkEatFood = () => {
		const eatFood = this.foodArray.some((food) => {
			if (snake.crashWith(food)) {
				this.foodArray.splice(this.foodArray.indexOf(food), 1);
				return true;
			}
		});

		if (eatFood) {
			this.stop();
		}
	};

	addTrail = () => {
		for (let i = 0; i < this.trail.length; i++) {
			this.ctx.fillRect(
				trail[i].x * this.snake,
				trail[i].y * this.snake,
				this.width,
				this.height
			);
			if (trail[i].x == this.snake.x && trail[i].y == this.snake.y) {
				this.stop();
			}
		}
	};

	score() {
		const points = Math.floor(this.frames / 5);
		this.ctx.font = "24px monospace";
		this.ctx.fillStyle = "white";
		this.ctx.fillText(`Score: ${points}`, 480, 20);
	}

	move() {
		if (game.key == 37) {
			if (snake.x < 0 - snake.width) {
				snake.x = 600 + snake.width;
			}
			snake.x -= 3;
		}

		if (game.key == 39) {
			if (snake.x > 600 + snake.width) {
				snake.x = 0 - snake.width;
			}
			snake.x += 3;
		}
		if (game.key == 38) {
			if (snake.y < 0 - snake.height) {
				snake.y = 600 + snake.height;
			}
			snake.y -= 3;
		}
		if (game.key == 40) {
			if (snake.y > 600 + snake.height) {
				snake.y = 0 - snake.height;
			}
			snake.y += 3;
		}

		window.addEventListener("keydown", (e) => {
			game.key = e.keyCode;
		});

		document.onkeyup = (e) => {
			snake.speedX = 0;
			snake.speedY = 0;
		};
	}

	updateGameArea = () => {
		this.clear();
		this.move();
		this.checkEatFood();
		this.updateFood();
		this.snake.newPos();
		this.snake.draw();
	};
}
