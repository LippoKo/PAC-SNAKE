let myGame;

function startGame() {
	snake = new component(10, 10, "white", 0, 300);
	//snake2 = new component(10, 10, "orange", 0, 400);

	myGameArea.start();
}

const myGameArea = {
	canvas: document.createElement("canvas"),
	start: function () {
		this.canvas.width = 600;
		this.canvas.height = 600;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener("keydown", function (e) {
			myGameArea.keys = myGameArea.keys || [];
			myGameArea.keys[e.keyCode] = true;
		});
		window.addEventListener("keyup", function (e) {
			myGameArea.keys[e.keyCode] = false;
		});
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
};

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function () {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	this.newPos = () => {
		this.x += this.speedX;
		this.y += this.speedY;
	};
}

function updateGameArea() {
	myGameArea.clear();
	snake.speedX = 0;
	snake.speedY = 0;
	if (myGameArea.keys && myGameArea.keys[37]) {
		snake.speedX = -1;
	}
	if (myGameArea.keys && myGameArea.keys[39]) {
		snake.speedX = 1;
	}
	if (myGameArea.keys && myGameArea.keys[38]) {
		snake.speedY = -1;
	}
	if (myGameArea.keys && myGameArea.keys[40]) {
		snake.speedY = 1;
	}
	snake.newPos();
	snake.update();
}

function moveup() {
	snake.speedY -= 1;
}

function moveup() {
	snake.speedY += 1;
}

function moveleft() {
	snake.speedX -= 1;
}

function moveright() {
	snake.speedX += 1;
}
