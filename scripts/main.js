const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

//Creating the snake
const snake = new Component(20, 20, "white", 0, 110, ctx);

//Creating the enemies
const enemy = new Enemies(300, 300);

//Creating the game
let game;

//game.start();

const startBtn = document.getElementById("start");

startBtn.addEventListener("click", () => {
	if (!game) {
		game = new Game(ctx, cWidth, cHeight, snake);
		game.start();
	} else if (game && !game.isRunning) {
		//when crashed
		game.reset();
	}
});
