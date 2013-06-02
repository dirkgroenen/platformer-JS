// Player class
var player = new (function(){
	// Create a new object based on functions
	var obj = this;
	
	// create the image
	obj.image = new Image();
	obj.image.src = 'graph/characters/Tux/tux_from_linux-00-11.png';
	obj.width = 50;
	obj.height = 55;
	obj.X = 0;
	obj.Y = 0;
	
	// Jump and fall attributes, including the attributes that will help with the gravity (and other move actions)
	obj.isJumping = false;
	obj.isFalling = false;
	obj.jumpSpeed = 0;
	obj.fallSpeed = 0;
	obj.isMoving = false;
	
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
			ctx.drawImage(obj.image, obj.X, obj.Y, obj.width, obj.height);
		} catch(e){} // Do nothing
	}
	
	// Methods for jumping
	obj.jump = function(){
		// Prevent jump in sky
		if(!obj.isJumping && ! obj.isFalling){
			obj.fallSpeed = 0;
			obj.isJumping = true;
			obj.jumpSpeed = 15;
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
	
	obj.fallStop = function(){
		// Stop falling
		obj.isFalling = false;
		obj.fallSpeed = 0;
	}
	
	// Methods for moving left or right
	obj.moveLeft = function(){
		if(obj.X > 0){
			obj.setPosition(obj.X - 5,obj.Y);
		}
	}
	
	obj.moveRight = function(){
		if(obj.X < c_width - obj.width){
			obj.setPosition(obj.X + 5,obj.Y);
		}
	}
	
	obj.stopMoving = function(){
		obj.isFalling = false;
		obj.fallSpeed = 0;
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
});

// Search for the nearest block to stand on
var placePlayerInField = function(){
	startPos = 0;
	groundTiles.forEach(function(tile){
		//if(tile.X == 0 && tile.Y < startPos) startPos = tile.Y;
	});
	
	player.setPosition(0,startPos);
}();