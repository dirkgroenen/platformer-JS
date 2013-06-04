// Bullet class
bullets = new Array();
var currentBullets = 0;

var bullet = function(x,y,direction){
	// Create a new object based on functions
	var obj = this;
	
	// create the image
	obj.image = new Image();
	obj.image.src = 'graph/other/bullet.png';
	obj.width = 15;
	obj.height = 15;
	obj.X = x;
	obj.Y = y;
	obj.bulletSpeed = 10;
	obj.active = true;
	
	function moveBullet(){
		if(obj.active){
			switch(direction){
				case 'l':
					obj.X -= obj.bulletSpeed;
					break;
				case 'r':
					obj.X += obj.bulletSpeed;
					break;
			}
		}
	}
	
	// Create the method that will draw the tile on the given position
	obj.draw = function(){
		moveBullet();
		// Try and catch to prevent that a JS error will block the whole game
		try{
			// Draw the tile on the canvas
			// drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
			ctx.drawImage(obj.image, obj.X, obj.Y, obj.width, obj.height);
		} catch(e){} // Do nothing
	};
	
	obj.remove = function(){
		obj.image = null;
		currentBullets--;
	}
};