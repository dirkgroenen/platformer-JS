// Player class
var player = new (function(){
	// Create a new object based on functions
	var obj = this;
	
	// preload images
	new Image().src = 'graph/character/walksheet_l.png';
	
	// create the image
	obj.image = new Image();
	obj.width = 50;
	obj.height = 64;
	obj.X = 0;
	obj.Y = 0;
	
	// Walk animation vars, interval prevents that every interval has a new animation
	obj.frames = 10;
    obj.actualFrame = 0;
    obj.interval = 0;
	
	// Jump and fall attributes, including the attributes that will help with the gravity (and other move actions)
	obj.isJumping = false;
	obj.isFalling = true;
	obj.jumpSpeed = 0;
	obj.fallSpeed = 0;
	obj.isMoving = false;
	obj.allowedToMoveRight = true;
	obj.allowedToMoveLeft = true;
	obj.currentMovement = 'r';
	obj.moveSpeed = 5;
	obj.holdMovement = false;
	obj.hasBounced = false;
	obj.bounceSpeed = 1;
	
	// Methods
	obj.setPosition = function(x,y){
		obj.X = x;
		obj.Y = y;
	}
	
	// Create the method that will draw the tile on the given position
	obj.draw = function(){
		obj.image.src = 'graph/character/walksheet_'+obj.currentMovement+'.png';
		// Try and catch to prevent that a JS error will block the whole game
		if(!obj.isMoving) obj.actualFrame = 0;
		
		
		try{
			// Draw the tile on the canvas
			// drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
			ctx.drawImage(obj.image, 0, obj.height * obj.actualFrame, obj.width, obj.height, obj.X, obj.Y, obj.width, obj.height);
		} catch(e){} // Do nothing
		
		if (obj.interval == 1 ) {
            (obj.actualFrame == obj.frames) ? obj.actualFrame = 0 : obj.actualFrame++;
			obj.interval = 0;
		}
		if(obj.isMoving){
			obj.interval++;
		}
	}
	
	// Methods for jumping
	obj.jump = function(){
		// Prevent jump in sky
		if(!obj.isJumping && ! obj.isFalling){
			obj.fallSpeed = 0;
			obj.isJumping = true;
			obj.jumpSpeed = 15;
			obj.allowedToMoveLeft = true;
			obj.allowedToMoveRight = true;
		}
	}
	
	obj.checkJump = function(){
		// Move the object according to the jump
		obj.setPosition(obj.X,obj.Y-obj.jumpSpeed);
		obj.jumpSpeed--;
		
		// Handler when touches ground again
		if(obj.jumpSpeed == 0){
			obj.isJumping = false;
			obj.fallSpeed = 1;
			obj.isFalling = true;
		}
		
		obj.allowedToMoveLeft = true;
		obj.allowedToMoveRight = true;
	}
	
	obj.stopJump = function(){
		obj.isJumping = false;
		obj.fallSpeed = 3;
		obj.isFalling = true;
	}
	
	// Methods for falling
	obj.checkFall = function(){
		// Check if object is still above bottom of canvas, if not: stop falling
		if(obj.Y < (c_height - obj.height)){
			obj.setPosition(obj.X,obj.Y + obj.fallSpeed);
			obj.fallSpeed++;
		}
		else{
			obj.fallStop();
		}
	}
	
	obj.fall = function(){
		obj.fallSpeed = 4;
		obj.isFalling = true;
		obj.isJumping = false;
	}
	
	obj.fallStop = function(){
		// Stop falling
		obj.isFalling = false;
		obj.fallSpeed = 0;
	}
	
	// Methods for moving left or right
	obj.moveLeft = function(){
		if(obj.X > 0 && obj.allowedToMoveLeft){
			obj.setPosition(obj.X - obj.moveSpeed,obj.Y);
			obj.allowedToMoveRight = true;
			obj.currentMovement = 'l';
			player.stopCamera = true;
		}
	}
	
	obj.moveRight = function(){
		if(obj.X < c_width - obj.width && obj.allowedToMoveRight && !obj.holdMovement){
			obj.setPosition(obj.X + obj.moveSpeed,obj.Y);
			obj.allowedToMoveLeft = true;
			obj.currentMovement = 'r';
			player.stopCamera = false;
		}
	}
	
	obj.stopFalling = function(){
		obj.isFalling = false;
		obj.fallSpeed = 0;
	}
	
	obj.stopMoving = function(){
		obj.actualFrame = 0;
		switch(obj.currentMovement){
			case 'l':
				obj.allowedToMoveLeft = false;
				break;
			case 'r':
				obj.allowedToMoveRight = false;
				break;
		}
	}
	
	obj.bounce = function(move){
		obj.jump();
		obj.hasBounced = true;
		obj.bounceSpeed = 15;;
	}
	
	obj.checkBounce = function(){
		if(obj.hasBounced){
			obj.bounceSpeed -= 1;
			(obj.currentMovement == 'r') ? obj.setPosition(obj.X-obj.bounceSpeed,obj.Y) : obj.setPosition(obj.X+obj.bounceSpeed,obj.Y);
			(obj.currentMovement == 'r') ? obj.allowedToMoveRight = false : obj.allowedToMoveLeft = false;
		}
		if(obj.X <= 0){
			obj.bounceSpeed = 0;
		}
		if(obj.bounceSpeed <= 0){
			obj.hasBounced = false;
		}
		if(obj.bounceSpeed == 0 && !obj.isFalling){
			obj.allowedToMoveRight = true;
			obj.allowedToMoveLeft = true;
		}
	}
	
	obj.getColPoint = function(point){
		cors = [];
		switch(point){
			case 11:
				cors['x'] = obj.X;
				cors['y'] = obj.Y;
				break;
			case 12:
				cors['x'] = obj.X+(obj.width/2);
				cors['y'] = obj.Y;
				break;
			case 13:
				cors['x'] = obj.X+obj.width;
				cors['y'] = obj.Y;
				break;
			case 21:
				cors['x'] = obj.X;
				cors['y'] = obj.Y+(obj.height/2);
				break;
			case 22:
				cors['x'] = obj.X+(obj.width/2);
				cors['y'] = obj.Y+(obj.height/2);
				break;
			case 23:
				cors['x'] = obj.X+obj.width;
				cors['y'] = obj.Y+(obj.height/2);
				break;
			case 31:
				cors['x'] = obj.X;
				cors['y'] = obj.Y+obj.height;
				break;
			case 32:
				cors['x'] = obj.X+(obj.width/2);
				cors['y'] = obj.Y+obj.height;
				break;
			case 33:
				cors['x'] = obj.X+obj.width;
				cors['y'] = obj.Y+obj.height;
				break;
		}
		return cors;
	}
	
	obj.shoot = function(){
		bullets.push(new bullet(obj.getColPoint(22)['x'],obj.getColPoint(22)['y'],obj.currentMovement));
		currentBullets++;
		gameStats.bulletsFired++;
		gameStats.points--;
	}
	

	obj.hitByEnemy = function(enemy){
		gameStats.lifes--;	
		obj.bounce(enemy.currentMovement);
	}
});

// Search for the nearest block to stand on
var placePlayerInField = function(){
	startPos = 0;
	groundTiles.some(function(tile){
		// Check for tiles below the player
		if((tile.getColPoint(11)['x'] <= player.getColPoint(32)['x'] && tile.getColPoint(13)['x'] >= player.getColPoint(32)['x'])){
			startPos = tile.getColPoint(11)['y'];
			return true;
		}
	});
	
	player.setPosition(0,startPos-player.height);
};