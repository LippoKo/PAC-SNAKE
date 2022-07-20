class Game {
	constructor(ctx, width, height, snake) {
		this.frames = 0;
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.snake = snake;
		this.enemy = enemy;
		this.food = null;
		this.points = 0;
		this.interval = null;
		this.isRunning = false;
		this.trail = [];
		this.enemyArray = [];
		this.speed = 1;
	}

	start = () => {
		this.createFood();

		this.interval = setInterval(this.updateGameArea, 20);
		this.isRunning = true;
	};

	reset = () => {
		this.snake.tail = 0;
		this.trail = [];
		this.snake.x = 0;
		this.snake.y = 110;
		this.frames = 0;
		this.enemyArray = [];
		this.points = 0;
		this.food = null;
		this.start();
	};

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	stop() {
		clearInterval(this.interval);
		this.isRunning = false;
	}

	createFood() {
		this.food = new Component(
			20,
			20,
			"green",
			Math.floor(Math.random() * this.width),
			Math.floor(Math.random() * this.height),
			this.ctx
		);
	}

	checkEatFood = () => {
		if (this.snake.crashWith(this.food)) {
			this.points++;
			this.snake.tail += 10;
			this.createFood();
			if (this.points % 3 === 0) {
				this.createEnemy();
			}
			if (this.points % 10 === 0) this.speed++;
		}
	};

	addTrail = () => {
		for (let i = 0; i < this.trail.length; i++) {
			this.ctx.fillRect(
				this.trail[i].x,
				this.trail[i].y,
				this.snake.width,
				this.snake.height
			);
			if (this.trail[i].x == this.snake.x && this.trail[i].y == this.snake.y) {
				this.stop();
			}
		}
		this.trail.push({ x: this.snake.x, y: this.snake.y });
		if (this.trail.length > this.snake.tail) {
			this.trail.shift();
		}
	};

	createEnemy() {
		this.enemyArray.push(
			new Enemies(
				Math.floor(Math.random() * this.width),
				Math.floor(Math.random() * this.height)
			)
		);
	}

	checkGameOver() {
		const crashed = this.enemyArray.some((enemy) => {
			return this.snake.crashWith(enemy);
		});

		if (crashed) {
			this.stop();
		}
	}

	updateEnemy() {
		for (let i = 0; i < this.enemyArray.length; i++) {
			if (this.enemyArray[i].x < this.snake.x) {
				this.enemyArray[i].x += this.speed;
			} else {
				this.enemyArray[i].x -= this.speed;
			}
			if (this.enemyArray[i].y < this.snake.y) {
				this.enemyArray[i].y += this.speed;
			} else {
				this.enemyArray[i].y -= this.speed;
			}

			this.enemyArray[i].draw();
		}
		this.frames++;
	}

	score() {
		const points = this.points;
		this.ctx.font = "24px monospace";
		this.ctx.fillStyle = "white";
		this.ctx.fillText(`Score: ${points}`, 480, 20);
	}

	move() {
		if (game.key == 37) {
			if (snake.x < 0 - snake.width) {
				snake.x = 600 + snake.width;
			}
			snake.x -= 2;
		}

		if (game.key == 39) {
			if (snake.x > 600 + snake.width) {
				snake.x = 0 - snake.width;
			}
			snake.x += 2;
		}
		if (game.key == 38) {
			if (snake.y < 0 - snake.height) {
				snake.y = 600 + snake.height;
			}
			snake.y -= 2;
		}
		if (game.key == 40) {
			if (snake.y > 600 + snake.height) {
				snake.y = 0 - snake.height;
			}
			snake.y += 2;
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
		this.addTrail();
		this.food.draw();
		this.updateEnemy();
		this.snake.newPos();
		this.snake.draw();
		this.checkGameOver();
		this.score();
	};
}
