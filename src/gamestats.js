// Gamestats like lifes and points
var gameStats = new (function(){
	var obj = this;
	
	// Number of lifes
	obj.lifes = 5;
	// Draw lifes
	obj.drawLifes = function(){
		for(var x = 1;x <= obj.lifes;x++){
			var image = new Image();
			image.src = 'graph/other/heart_full.png';
			image.height = 16;
			image.width = 16;
			image.Y = 10;
			image.X = (1000-10)-image.width*x-(x*2);

			try{
				// Draw the tile on the canvas
				// drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
				ctx.drawImage(image, image.X, image.Y, image.width, image.height);
				
			} catch(e){} // Do nothing
		}
	}
	
	// Level
	obj.currentLevel = 1;
	
	// Points
	obj.points = 0;
	
	// Bullets
	obj.bulletsFired = 0;
	obj.bulletsHit = 0;
	
	// Enemies
	obj.enemiesKilled = 0;
});