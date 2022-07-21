class Game {
	constructor(ctx, width, height, snake) {
		this.frames = 0;
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.snake = snake;
		this.food = null;
		this.points = 0;
		this.interval = null;
		this.isRunning = false;
		this.trail = [];
		this.enemyArray = [];
		this.speed = 1;
		this.directionQueue = "";
		this.direction = "";
		this.snakeBody = new Image();
		this.snakeBody.addEventListener("load", () => {});
		this.snakeBody.src = "./docs/assets/images/pacmann.png";
	}

	start = () => {
		this.createFood();
		this.interval = setInterval(this.updateGameArea, 20);
		this.isRunning = true;
	};

	reset = () => {
		this.snake.tail = 0;
		this.trail = [];
		this.snake.x = 300;
		this.snake.y = 300;
		this.frames = 0;
		this.enemyArray = [];
		this.points = 0;
		this.food = null;
		this.speed = 1;
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
			25,
			25,
			"",
			Math.floor(Math.random() * 580),
			Math.floor(Math.random() * (this.width - 30)),
			this.ctx,
			"./docs/assets/images/HB.png"
		);
	}

	checkEatFood = () => {
		if (this.snake.crashWith(this.food)) {
			this.points++;
			this.snake.tail += 5;
			this.createFood();
			if (this.points % 2 === 0) {
				this.createEnemy();
			}
			if (this.points % 8 === 0) this.speed++;
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

	updateEnemy() {
		for (let i = 0; i < this.enemyArray.length; i++) {
			if (this.points <= 5) {
				if (this.enemyArray[i].x < this.snake.x) {
					this.enemyArray[i].x++;
				} else {
					this.enemyArray[i].x--;
				}
				if (this.enemyArray[i].y < this.snake.y) {
					this.enemyArray[i].y++;
				} else {
					this.enemyArray[i].y--;
				}
			} else if (this.points > 5 && this.points < 10) {
				this.enemyArray[i].enemyMove();
			} else if (this.points >= 7) {
				if (this.enemyArray[i].x < this.snake.x) {
					this.enemyArray[i].x++;
				} else {
					this.enemyArray[i].x--;
				}
				if (this.enemyArray[i].y < this.snake.y) {
					this.enemyArray[i].y++;
				} else {
					this.enemyArray[i].y--;
				}
			} else if (this.points === 5) {
				this.enemyArray = [];
			}
			this.enemyArray[i].draw();
			this.frames++;
		}
	}

	changeDirection(keycode) {
		if (keycode === 37 && this.direction !== "right") {
			this.directionQueue = "left";
		} else if (keycode === 38 && this.direction !== "down") {
			this.directionQueue = "up";
		} else if (keycode === 39 && this.direction !== "left") {
			this.directionQueue = "right";
		} else if (keycode === 40 && this.direction !== "up") {
			this.directionQueue = "down";
		}
	}

	move() {
		this.direction = this.directionQueue;

		if (this.direction == "right") {
			if (snake.x > 580 + snake.width) {
				snake.x = 0 - snake.width;
			}
			snake.x += 3;
		} else if (this.direction == "left") {
			if (snake.x < 0 - snake.width) {
				snake.x = 580 + snake.width;
			}
			snake.x -= 3;
		} else if (this.direction == "up") {
			if (snake.y < 0 - snake.height) {
				snake.y = 580 + snake.height;
			}
			snake.y -= 3;
		} else if (this.direction == "down") {
			if (snake.y > 580 + snake.height) {
				snake.y = 0 - snake.height;
			}
			snake.y += 3;
		}

		document.onkeyup = (e) => {
			snake.speedX = 0;
			snake.speedY = 0;
		};
		document.addEventListener("keydown", (e) => {
			this.changeDirection(e.keyCode);
		});
	}

	addTrail = () => {
		for (let i = 0; i < this.trail.length; i++) {
			this.ctx.drawImage(
				this.snakeBody,
				this.trail[i].x,
				this.trail[i].y,
				this.snake.width,
				this.snake.height
			);

			//self-colission
			if (this.trail[i].x == this.snake.x && this.trail[i].y == this.snake.y) {
				this.stop();
			}
		}
		this.trail.push({ x: this.snake.x, y: this.snake.y });
		if (this.trail.length > this.snake.tail) {
			this.trail.shift();
		}
	};

	checkGameOver() {
		const crashed = this.enemyArray.some((enemy) => {
			return this.snake.crashWith(enemy);
		});

		if (crashed) {
			this.stop();
		}
	}

	score() {
		const points = this.points;
		this.ctx.font = "24px monospace";
		this.ctx.fillStyle = "white";
		this.ctx.fillText(`Score: ${points}`, 480, 20);
	}

	updateGameArea = () => {
		this.clear();
		this.move();
		this.checkEatFood();
		this.addTrail();
		this.updateEnemy();
		this.snake.newPos();
		this.snake.drawImg();
		this.food.drawImg();
		this.checkGameOver();
		this.score();
	};
}
