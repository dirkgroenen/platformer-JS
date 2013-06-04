// Player class
var player = new (function(){
	// Create a new object based on functions
	var obj = this;
	
	// create the image
	obj.image = new Image();
	obj.image.src = 'graph/characters/Tux/tuxmove.png';
	obj.width = 37;
	obj.height = 56;
	obj.X = 0;
	obj.Y = 0;
	
	// Walk animation vars, interval prevents that every interval has a new animation
	obj.frames = 1;
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
	obj.currentMovement = null;
	
	// Methods
	obj.setPosition = function(x,y){
		obj.X = x;
		obj.Y = y;
	}
	
	// Create the method that will draw the tile on the given position
	obj.draw = function(){
		// Try and catch to prevent that a JS error will block the whole game
		try{
			// Draw the tile on the canvas
			// drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
			ctx.drawImage(obj.image, 0, obj.height * obj.actualFrame, obj.width, obj.height, obj.X, obj.Y, obj.width, obj.height);
		} catch(e){} // Do nothing
		
		if (obj.interval == 8 ) {
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
		obj.fallSpeed = 1;
		obj.isFalling = true;
	}
	
	obj.fallStop = function(){
		// Stop falling
		obj.isFalling = false;
		obj.fallSpeed = 0;
	}
	
	// Methods for moving left or right
	obj.moveLeft = function(){
		if(obj.X > 0 && obj.allowedToMoveLeft){
			obj.setPosition(obj.X - 5,obj.Y);
			obj.allowedToMoveRight = true;
			obj.currentMovement = 'l';
		}
	}
	
	obj.moveRight = function(){
		if(obj.X < c_width - obj.width && obj.allowedToMoveRight){
			obj.setPosition(obj.X + 5,obj.Y);
			obj.allowedToMoveLeft = true;
			obj.currentMovement = 'r';
		}
	}
	
	obj.stopFalling = function(){
		obj.isFalling = false;
		obj.fallSpeed = 0;
	}
	
	obj.stopMoving = function(){
		switch(obj.currentMovement){
			case 'l':
				obj.allowedToMoveLeft = false;
				break;
			case 'r':
				obj.allowedToMoveRight = false;
				break;
		}
	}
	
	obj.getBottom = function(){
		return obj.Y-obj.height;
	}
	obj.getTop = function(){
		return obj.Y;
	}
	obj.getLeft = function(){
		return obj.X;
	}
	obj.getRight = function(){
		return obj.X+obj.width;
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
});

// Search for the nearest block to stand on
var placePlayerInField = function(){
	startPos = 0;
	groundTiles.forEach(function(tile){
		//if(tile.X == 0 && tile.Y < startPos) startPos = tile.Y;
	});
	
	player.setPosition(0,startPos);
}();