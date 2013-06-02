var FPS = 30;

function drawMap(){
	skyTiles.forEach(function(tile){
		tile.draw();
	});
	groundTiles.forEach(function(tile){
		tile.draw();
	});
}

// Check when keys are pressed
var keyRegister = [0,0,0];
document.onkeydown = function(event){
	key = event.keyCode;
	if(key == 37) keyRegister[0] = 1;
	if(key == 38) keyRegister[1] = 1;
	if(key == 39) keyRegister[2] = 1;
	if(key >= 37 && key <= 39)	player.isMoving = true;
}

document.onkeyup = function(event){
	key = event.keyCode;
	if(key == 37) keyRegister[0] = 0;
	if(key == 38) keyRegister[1] = 0;
	if(key == 39) keyRegister[2] = 0;
	
	if(keyRegister[0] == 0 && keyRegister[1] == 0 && keyRegister[2] == 0){
		player.isMoving = false;
	}
}


// Ceck for player collisions with platforms
var checkCollision = function(){
	if(player.isMoving || player.isFalling){
		groundTiles.forEach(function(tile,ind){
			if((tile.getLeft() >= player.getLeft() && tile.getLeft() <= player.getRight())){	
				if(player.getBottom() > tile.getTop()-player.height-5){
					tile.onCollide();
				}				
			}
		});
	}
};

/* The most important part of the game: the GameLoop! */
/* ! Needs to be placed at the bottom of the core file */
// Set the frames per second (FPS)

var GameLoop = function(){
	clear();
	
	// Draw the map and character
	drawMap();
	player.draw();
	
	// Check for collisions
	checkCollision();
	
	// Check jump and fall of player
	if(player.isJumping) player.checkJump();
	if(player.isFalling) player.checkFall();
	
	// Check the keyRegister for player movement
	if(keyRegister[0] == 1) player.moveLeft();
	if(keyRegister[1] == 1) player.jump();
	if(keyRegister[2] == 1) player.moveRight();
	
	// Repeat the loop over and over again.
	gLoop = setTimeout(GameLoop,FPS);
	
}
GameLoop();