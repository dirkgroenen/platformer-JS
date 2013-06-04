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
// Player getColPoint([1-3][1-3]):
// 1:[1-3]: top, middle, bottom
// 2:[1-3] left, middle, right
var checkCollision = function(){
	// Check if there is a box on his head or under his ass
	if(player.isFalling || player.isJumping){
		groundTiles.forEach(function(tile){
			// Check the tiles under the player's X
			if((player.getColPoint(31)['x'] >= tile.getLeft() && player.getColPoint(31)['x'] <= tile.getRight()) || (player.getColPoint(33)['x'] >= tile.getLeft() && player.getColPoint(33)['x'] <= tile.getRight())){
				// Check the players Y position with the tiles, it's no collision as long as the players Y position is lower the the ground top position
				if(player.getColPoint(32)['y'] >= tile.getTop()){
					player.stopFalling();
					console.log('collision');
				}
			}
		});
	}
	// Check for a box on the left or right
	if(player.isMoving){
		groundTiles.forEach(function(tile){
			// Check for tiles on the right side
			if(((player.getColPoint(23)['x'] >= tile.getColPoint(21)['x'] && player.getColPoint(22)['x'] <= tile.getColPoint(23)['x']) || (player.getColPoint(21)['x'] <= tile.getColPoint(23)['x'] && player.getColPoint(22)['x'] >= tile.getColPoint(23)['x'])) && (player.getColPoint(23)['y'] <= tile.getColPoint(31)['y'] && player.getColPoint(23)['y'] >= tile.getColPoint(11)['y'])){
				// Check the players Y position with the tiles, it's no collision as long as the players Y position is lower the the ground top position
				player.stopMoving();
			}
		});
	}
};

// Check if tux ain't jezus: check if there is ground under his feets
var gravityCheck = function(){
	var blockheight = 0;
	if(player.isMoving){
		groundTiles.some(function(tile){
			// Check for tiles below the player
			if((tile.getColPoint(11)['x'] <= player.getColPoint(32)['x'] && tile.getColPoint(13)['x'] >= player.getColPoint(32)['x'])){
				blockheight = tile.getColPoint(11)['y'];
				return true;
			}
		});
		if(blockheight > player.getColPoint(32)['y'] && !player.isFalling && !player.isJumping){
			player.fall();
		}
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
	
	// Check for gravity
	gravityCheck();
	
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