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
var gameWidth = 0;

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
	
	obj.setPosition = function(x,y){
		obj.X = x;
		obj.Y = y;
	}
	
	return obj;
}

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
		
	}
	
	// Return top of the tile
	obj.getTop = function(){
		return obj.Y;
	}
	obj.getBottom = function(){
		return obj.Y-obj.height;
	}
	obj.getLeft = function(){
		return obj.X;
	}
	obj.getRight = function(){
		return obj.X + obj.width;
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
	
	obj.setPosition = function(x,y){
		obj.X = x;
		obj.Y = y;
	}
	
	return obj;
}

var generateMap = function(map_array){
	var xCor = 0,yCor = 0;
	
	// Loop through all the Y rows
	for(var x = 0; x < map_array.length;x++){
		// Loop through all the X rows
		yCor = x*t_width;
		
		for(var y = 0;y < map_array[x].length;y++){
			xCor = y*t_height;
			
			// Check which tile needs to be drawn
			switch(map_array[x][y]){
				case 0:
					skyTiles[xCor+yCor/50] = new skyTile(xCor,yCor);
					break;
				case 1:
					groundTiles[xCor+yCor/50] = new groundTile(xCor,yCor,"dirt");
					break;
				case 2:
					groundTiles[xCor+yCor/50] = new groundTile(xCor,yCor,"dirt_rock");
					break;
			}
		}
		
		gameWidth = map_array[x].length*t_width;
	}
};