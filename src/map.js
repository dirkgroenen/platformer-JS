// Set game canvas size: 1000 * 600 (px) and get the canvas
var c_width = 1000, c_height = 600;
c = document.getElementById("game");

// Get the 2D graphic context to the canvas
ctx = c.getContext("2d");

// Set the height and width of the canvas
c.height = c_height;
c.width = c_width;

// Canvas elelements can't move. We need to clear the canvas and draw the updated elements back.
var clear = function(){
	ctx.fillStyle = '#88f7ff'; // Draw the background color
	ctx.beginPath(); // Clear the whole canvas
	ctx.rect(0,0,c_width,c_height); // Cover the whole canvas with a rectangle
	ctx.closePath(); // End drawing
	ctx.fill(); // Fill the rectangle with the fillStyle color defined before
}

// Set the height and width of a tile image
t_width = 50, t_height = 50;
var skyTiles = [];
var groundTiles = [];


// Create the sky
var skyTile = function(xpos,ypos){
	var obj = this;
	// Create the image object and set it's height and width
	obj.image = new Image();
	// There are three sky tiles. Get a random tile
	random_num = Math.floor((Math.random()*10)+1); // Random number
	if(random_num > 0 && random_num <= 8) obj.image.src = "graph/tiles/sky_2.png";
	if(random_num == 9) obj.image.src = "graph/tiles/sky_0.png";
	if(random_num == 10) obj.image.src = "graph/tiles/sky_3.png";
	
	// Give position to image object	
	obj.height = t_height;
	obj.width = t_width;
	obj.X = xpos;
	obj.Y = ypos;
	
	// Create the method that will draw the tile on the given position
	obj.draw = function(){
		// Try and catch to prevent that a JS error will block the whole game
		try{
			// Draw the tile on the canvas
			// drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
			ctx.drawImage(obj.image, obj.X, obj.Y, obj.width, obj.height);
		} catch(e){} // Do nothing
	}
	
	return obj;
}

var generateSkyTiles = function(){
	// Create a loop that runs through every possible tile in the canvas
	for(var x = 0;x < c_width;x += t_width){
		for(var y = 0;y < c_height;y += t_height){
			skyTiles[x+y/50] = new skyTile(x,y);
		}
	}
}();

// Create the ground
var groundTile = function(xpos,ypos,type){
	var obj = this;
	// Create the image object and set it's height and width
	obj.image = new Image();
	
	// There are three sky tiles. Get a random tile
	random_num = Math.floor((Math.random()*2)+1); // Random number
	if(random_num == 1) obj.image.src = "graph/tiles/"+type+"_1.png";
	if(random_num == 2) obj.image.src = "graph/tiles/"+type+"_0.png";
		
	// Give position to image object	
	obj.height = t_height;
	obj.width = t_width;
	obj.X = xpos;
	obj.Y = ypos;
	
	// Create the method that will draw the tile on the given position
	obj.draw = function(){
		// Try and catch to prevent that a JS error will block the whole game
		try{
			// Draw the tile on the canvas
			// drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
			ctx.drawImage(obj.image, obj.X, obj.Y, obj.width, obj.height);
		} catch(e){} // Do nothing
	}
	
	// Create an collision function
	obj.onCollide = function(){
		player.stopMoving();
	}
	
	// Return top of the tile
	obj.getTop = function(){
		return obj.Y-obj.height;
	}
	obj.getBottom = function(){
		return obj.Y;
	}
	obj.getLeft = function(){
		return obj.X;
	}
	obj.getRight = function(){
		return obj.X + obj.width;
	}
	
	return obj;
}

// The array that will tell how high every piece of ground must be
// This will be level based, but for now we have one array
var heightarray = [2,2,2,2,3,3,3,3,3,4,4,4,3,2,2,3,0,1,2,2,2,2,3,4,5,5,0,5,4,4,3,2,2,3,0,1,2,2,2,2,3,4,5,5,0,5,4,4,3,2,2,3,0,1,2];

var generateGroundTiles = function(){
	// The ground needs to be drawn from the bottom of the canvas
	for(var x = 0;x < c_width;x += t_width){
		for(var y = c_height-(heightarray[x/50]*50);y < c_height;y += t_height){
			groundTiles[x+y/50] = ((y+(50*heightarray[x/50]) == 600)) ? new groundTile(x,y,"dirt_rock") : new groundTile(x,y,"dirt");
		}
	}
}();