var FPS = 25;
var scrolled = 0;

/* INIT canvas */
// Set game canvas size: 1000 * 600 (px) and get the canvas
var c_width = 1000, c_height = 600;
c = document.getElementById("game");

// Get the 2D graphic context to the canvas
ctx = c.getContext("2d");

// Set the height and width of the canvas
c.height = c_height;
c.width = c_width;


function drawMap(){
	skyTiles.forEach(function(tile){
		tile.draw();
	});
	decorObjects.forEach(function(object){
		object.draw();
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
	if(key == 27){
		(!menu.menuOpened) ? menu.open() : menu.close();
	}
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
			if(((player.getColPoint(32)['x'] >= tile.getColPoint(11)['x'] && player.getColPoint(32)['x'] <= tile.getColPoint(13)['x']) || (player.getColPoint(33)['x']-20 >= tile.getColPoint(11)['x'] && player.getColPoint(33)['x']-20 <= tile.getColPoint(13)['x']) || (player.getColPoint(31)['x']+20 >= tile.getColPoint(11)['x'] && player.getColPoint(31)['x']+20 <= tile.getColPoint(13)['x'])) && player.getColPoint(22)['y'] < tile.getColPoint(32)['y']){
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
		if(!enemie.dead){
			enemie.walk();
		}
		enemie.draw();
	});
}


// !! Generatemap creates  the gameWidth which is needed when generating a moving camera !! //
generateMap(levels[gameStats.currentLevel-1]['map']); // Code that selects the level, at the moment hard coded level 1
enemyGenerator(levels[gameStats.currentLevel-1]['enemies']);
placePlayerInField(); // After generating the map: place player in field

var boxCameraCheck = function(){
	if(player.isMoving && player.X > c_width*0.5 && !player.stopCamera && scrolled < gameWidth-c_width){
		scrolled += player.moveSpeed;
		player.allowedToMoveRight = false;
		
		groundTiles.forEach(function(tile){
			tile.setPosition(tile.X-player.moveSpeed,tile.Y);
		});
		skyTiles.forEach(function(tile){
			tile.setPosition(tile.X-player.moveSpeed/2.5,tile.Y);
		});
		
		enemies.forEach(function(enemie){
			enemie.changeWPs(player.moveSpeed);
			enemie.setPosition(enemie.X-player.moveSpeed,enemie.Y);
		});
		
		decorObjects.forEach(function(decor){
			decor.setPosition(decor.X-player.moveSpeed,decor.Y);
		})
	}
	else{
		player.holdMovement = false;
	}
}

// Draw the bullets and move them
var drawBullets = function(){
	var activebullets = 0;
	bullets.forEach(function(bullet){
		if(bullet.X <= c_width+scrolled && bullet.active){
			bullet.draw();
			activebullets++;
		}
		else{
			bullet.active = false;
			bullet.remove();
		}
	});
	if(activebullets == 0) bullets = new Array();
}

var drawGameStats = function(){
	gameStats.drawLives();
	gameStats.drawPoints();
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
	
	if(!menu.menuOpened){
		clear();
		
		// Check for collisions
		checkCollision();
		
		// Draw the map and character
		drawMap();
		player.draw();
		drawEnemies();
		
		// Draw the game stats
		drawGameStats();
		
		// Check for gravity
		gravityCheck();
		
		// Moving camera function
		boxCameraCheck();
		
		// Draw bullets
		drawBullets();
		
		// Check jump and fall of player
		if(player.isJumping) player.checkJump();
		if(player.isFalling) player.checkFall();
		player.checkBounce();
		
		// Check the keyRegister for player movement
		if(keyRegister[0] == 1) player.moveLeft();
		if(keyRegister[1] == 1) player.jump();
		if(keyRegister[2] == 1) player.moveRight();
	}

	if(gameStats.lifes == 0){
		// DEAD
	}
	
	// Repeat the loop over and over again.
	gLoop = setTimeout(GameLoop,FPS);
	
}
GameLoop();
