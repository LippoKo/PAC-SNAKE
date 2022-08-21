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

	//clear the canvas **
	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	stop() {
		clearInterval(this.interval);
		this.isRunning = false;
	}

	//create the element food **
	createFood() {
		this.food = new Component(
			25,
			25,
			"",
			Math.floor(Math.random() * 550),
			Math.floor(Math.random() * 550),
			this.ctx,
			"./docs/assets/images/HB.png"
		);
	}

	//create the conditions for EatFood and what happens after somo amounts of points *****
	checkEatFood = () => {
		if (this.snake.crashWith(this.food)) {
			this.points += 1;
			this.snake.tail += 5;
			this.createFood();
			if (this.points % 2 === 0) {
				this.createEnemy();
			}
			if (this.points % 10 === 0) this.speed++;
			if (this.points === 4) {
				this.createEnemy();
			}
			if (this.points === 8) {
				this.createEnemy();
			}
			if (this.points === 13) {
				this.createEnemy();
				this.createEnemy();
			}
			if (this.points === 19) {
				this.createEnemy();
				this.createEnemy();
			}
			if (this.points === 3) {
				this.snake.speedX += 3;
				this.snake.speedY -= 3;
			}
			if (this.points === 7) {
				this.enemyArray = [];
				this.snake.speedX += 2;
				this.snake.speedY -= 2;
			}
			if (this.points === 12) {
				this.enemyArray = [];
				this.snake.speedX += 2;
				this.snake.speedY -= 2;
			}
			if (this.points === 18) {
				this.snake.speedX += 2;
				this.snake.speedY += 2;
			}
			if (this.points === 22) {
				this.enemyArray = [];
				this.snake.speedX += 2;
				this.snake.speedY += 2;
				this.createEnemy();
				this.createEnemy();
			}
			if (this.points === 24) {
				this.snake.speedX += 2;
				this.snake.speedY += 2;
			}
			if (this.points === 25) {
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
				this.createEnemy();
			}
		}
	};

	//logic to create a tail for the snake ***
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

	//create the element Enemy and push to the enemyArray **
	createEnemy() {
		this.enemyArray.push(
			new Enemies(
				Math.floor(Math.random() * this.width),
				Math.floor(Math.random() * this.height)
			)
		);
	}

	//create the logic to work together with the move() method and dont let the snake make reverse moviment ***
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

	//set the direction and change velocity of snake *****
	move() {
		this.direction = this.directionQueue;

		if (this.direction == "right") {
			if (snake.x > 550 + snake.width) {
				snake.x = 10 - snake.width;
			}
			snake.x += 3;
		} else if (this.direction == "left") {
			if (snake.x < 10 - snake.width) {
				snake.x = 550 + snake.width;
			}
			snake.x -= 3;
		} else if (this.direction == "up") {
			if (snake.y < 10 - snake.height) {
				snake.y = 550 + snake.height;
			}
			snake.y -= 3;
		} else if (this.direction == "down") {
			if (snake.y > 550 + snake.height) {
				snake.y = 10 - snake.height;
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

	checkGameOver() {
		const crashed = this.enemyArray.some((enemy) => {
			return this.snake.crashWith(enemy);
		});

		if (crashed) {
			this.stop();
		}
	}

	//create the logic for all moviments and changes for the Enemies *****
	updateEnemy() {
		for (let i = 0; i < this.enemyArray.length; i++) {
			if (this.points <= 5) {
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
			} else if (this.points > 5 && this.points <= 8) {
				this.enemyArray[i].enemyMove();
			} else if (this.points > 8 && this.points <= 12) {
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
			} else if (this.points > 12 && this.points <= 16) {
				this.enemyArray[i].enemyMove();
			} else if (this.points > 16 && this.points <= 20) {
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
			} else if (this.points > 20 && this.points <= 26) {
				this.enemyArray[i].enemyMove();
			} else if (this.points > 26) {
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
			}
			this.enemyArray[i].draw();
			this.frames++;
		}
	}

	score() {
		const points = this.points;
		this.ctx.font = "24px monospace";
		this.ctx.fillStyle = "white";
		this.ctx.fillText(`Score: ${points}`, 480, 20);
	}

	//Update all the important methods of the game *****
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
