var a_canvas = document.getElementById("a");
var ctx = a_canvas.getContext("2d");
var position_x = 0;
var position_y = 0;
var direction_y = 1;
var direction_x = 0;
var snakeArray = [];
var SNAKE_SQUARE_SIZE = 15;
var isApple = false;
var appleArray = [];
var score = 0;
var highscore = 0;


// CHECK IF LOCALSTORAGE HAS A HIGHSCORE SAVED
if(localStorage.getItem("highscore") !== null){
	highscore = localStorage.getItem("highscore");
}
// TO CREATE POINT OBJECTS
function Point(x, y) {
	this.x = x;
	this.y = y;
}

// INITIALIZE THE SNAKE
snakeArray.push(new Point(0,30));
snakeArray.push(new Point(0,15));
snakeArray.push(new Point(0,0));

// KEYLISTENER
document.addEventListener('keydown', function(event) {
    // TURN LEFT
    if (event.keyCode == 37 && direction_x == 0) {
        direction_x = -1;
        direction_y = 0;
    }
    // TURN RIGHT
    else if (event.keyCode == 39 && direction_x == 0) {
        direction_x = 1;
        direction_y = 0;
    }
    // TURN UP
    else if (event.keyCode == 38 && direction_y == 0) {
    direction_x = 0;
    direction_y = -1;
    }
    // TURN DOWN
    else if (event.keyCode == 40 && direction_y == 0) {
    direction_x = 0;
    direction_y = 1;
    }

}, true);

// GAME LOOP
var gameloop = setInterval(drawSnake, 60);

// RENDER
function drawSnake(){
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, a_canvas.width, a_canvas.height);

// DRAW SCORE
ctx.fillStyle = "tomato";
ctx.font="15px Verdana";
ctx.fillText("Score: "+score, 300, 20);
ctx.fillText("High score: "+highscore, 300, 35);

// DRAW SNAKE
for (var i = snakeArray.length - 1; i >= 0; i--) {
	ctx.fillStyle = "tomato";
	ctx.fillRect(snakeArray[i].x, snakeArray[i].y, SNAKE_SQUARE_SIZE - 1, SNAKE_SQUARE_SIZE - 1);
	ctx.fillStyle = "black";
	ctx.rect(snakeArray[i].x, snakeArray[i].y, SNAKE_SQUARE_SIZE, SNAKE_SQUARE_SIZE);

	if(i != 0) {
	snakeArray[i].x = snakeArray[i - 1].x;
	snakeArray[i].y = snakeArray[i - 1].y;
	}
}

// CREATE A NEW APPLE
if (!isApple) {
	var apple_x = 0;
	var apple_y = 0;
	do {
		apple_x = Math.floor((Math.random() * 435));
		apple_y = Math.floor((Math.random() * 435));
	} while (apple_x % 15 != 0 && apple_y % 15 != 0);

	appleArray[0] = new Point(apple_x, apple_y);
	isApple = true;

	// Make sure that the apple is not on top of the snake
	for (var i = snakeArray.length - 1; i > 2; i--) {
		if(apple_x == snakeArray[i].x && apple_y == snakeArray[i].y){
			isApple = false;
		}
	}
}

// DRAW EXISTING APPLE
if(isApple){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(appleArray[0].x, appleArray[0].y, 14, 14);
}

// GAME UPDATE
snakeArray[0].y += 15 * direction_y;
snakeArray[0].x += 15 * direction_x;

// CHECK COLLISION WITH THE WALLS
if (snakeArray[0].y <= -15 || snakeArray[0].y >= a_canvas.height) {
	clearInterval(gameloop);
	gameOver();
}

if (snakeArray[0].x <= -15 || snakeArray[0].x >= a_canvas.width) {
	clearInterval(gameloop);
	gameOver();
}

// CHECK COLLISION WITH AN APPLE
if (snakeArray[0].x <= ((appleArray[0].x) + 10) && snakeArray[0].x >= ((appleArray[0].x) - 10)  && snakeArray[0].y <= ((appleArray[0].y) + 10) && snakeArray[0].y >= ((appleArray[0].y) - 10)) {
	isApple = false;
	p = new Point(snakeArray[snakeArray.length - 1].x, snakeArray[snakeArray.length - 1].y);
	snakeArray.push(new Point(p.x, p.y));
	score += 10;
}

// CHECK COLLISION WITH THE SNAKE
for (var i = snakeArray.length - 1; i > 2; i--) {
	if(snakeArray[0].x == snakeArray[i].x && snakeArray[0].y == snakeArray[i].y){
		clearInterval(gameloop);
		gameOver();
	}
}


}
function gameOver() {
	ctx.fillStyle = "#FFFFFF";
	ctx.font= "30px Verdana";
	ctx.fillText("Game Over", a_canvas.width / 2 - 90, a_canvas.height / 2);
	if(score > highscore) {
		localStorage.highscore = score;
		alert("New high score! " + score);
	}
	var answer = confirm("New game?");
		if (answer == true) {
    	location.reload();
		} 
}



