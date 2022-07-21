const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

//Creating the snake
const snake = new Component(
	25,
	25,
	"",
	300,
	300,
	ctx,
	"./docs/assets/images/pacmann.png"
);

//Creating the game
let game;

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
