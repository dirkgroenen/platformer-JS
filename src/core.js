var FPS = 30;
var scrolled = 0;

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
		player.stopCamera = true;
	}
	
	if(key == 32) player.shoot();
}

// Check if tux ain't jezus: check if there is ground under his feets
var gravityCheck = function(){
	var blockheight = 0;
	if(player.isMoving){
		groundTiles.some(function(tile){
			// Check for tiles below the player
			if((tile.getColPoint(11)['x'] <= player.getColPoint(32)['x'] && tile.getColPoint(13)['x'] >= player.getColPoint(32)['x']) && tile.getColPoint(11)['y'] > player.getColPoint(21)['y']){
				blockheight = tile.getColPoint(11)['y'];
				return true;
			}
		});
		if(((blockheight > player.getColPoint(32)['y']) || blockheight == 0)&& !player.isFalling && !player.isJumping){
			player.fall();
		}
	}
};

var drawEnemies = function(){
	enemies.forEach(function(enemie){
		enemie.walk();
		enemie.draw();
	});
}

// !! Generatemap creates  the gameWidth which is needed when generating a moving camera !! //
generateMap(level_1['map']); // Code that selects the level, at the moment hard coded level 1
enemyGenerator(level_1['enemies']);
placePlayerInField(); // After generating the map: place player in field

var boxCameraCheck = function(){
	if(player.isMoving && player.X > c_width*0.5 && !player.stopCamera && scrolled < gameWidth-c_width){
		scrolled += player.moveSpeed;
		player.holdMovement = true;
		
		groundTiles.forEach(function(tile){
			tile.setPosition(tile.X-player.moveSpeed,tile.Y);
		});
		skyTiles.forEach(function(tile){
			tile.setPosition(tile.X-player.moveSpeed/1.5,tile.Y);
		});
		
		enemies.forEach(function(enemie){
			enemie.changeWPs(player.moveSpeed);
			enemie.setPosition(enemie.X-player.moveSpeed,enemie.Y);
		});
	}
	else{
		player.holdMovement = false;
	}
}

// Draw the bullets and move them
var drawBullets = function(){
	bullets.forEach(function(bullet){
		if(bullet.X <= c_width+scrolled && bullet.active){
			bullet.draw();
		}
		else{
			bullet.active = false;
			bullet.remove();
		}
	});
}

/* The most important part of the game: the GameLoop! */
/* ! Needs to be placed at the bottom of the core file */
// Set the frames per second (FPS)
var lastLoop = new Date;

var GameLoop = function(){
	var thisLoop = new Date;
	var fps = 1000 / (thisLoop - lastLoop);
	lastLoop = thisLoop;
	document.getElementById('fps').innerHTML = Math.round(fps);
	
	clear();
	
	// Draw the map and character
	drawMap();
	player.draw();
	drawEnemies();
	
	// Check for collisions
	checkCollision();
	
	// Check for gravity
	gravityCheck();
	
	// Moving camera function
	boxCameraCheck();
	
	// Draw bullets
	drawBullets();
	
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