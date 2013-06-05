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
var decorObjects = [];
var gameWidth = 0;

// Create the sky
var skyTile = function(xpos,ypos){
	var obj = this;
	// Create the image object and set it's height and width
	obj.image = new Image();
	// There are three sky tiles. Get a random tile
	random_num = Math.floor((Math.random()*20)+1); // Random number
	if(random_num == 1) obj.image.src = "graph/clouds/cloud_1.png";
	else if(random_num == 2) obj.image.src = "graph/clouds/cloud_2.png";
	else if(random_num == 3) obj.image.src = "graph/clouds/cloud_3.png";
	else  obj.image.src = "graph/clouds/empty.png";
	
	// Give position to image object	
	obj.height = 25;
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
	obj.image.src = "graph/ground/"+type+".png";
	
	switch(type){
		case 'bridge':
			obj.height = 17;
			obj.width = 50;
			break;
		default:
			obj.height = t_height;
			obj.width = t_width;
			break;
	}
		
	// Give position to image object	
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

// Create mab object
var decorObject = function(x,y,type){
	var obj = this;

	// Assign image and other vars
	obj.image = new Image();
	obj.X = x;
	obj.Y = y;
	obj.canFly = false;
	
	/* All object numbers have their own image and sizes */
	/* 	11 : hill_short
	*	12 : hill_long
	*	13 : shroom
	*	14 : spikes
	*/
	switch(type){
		case 11:
			obj.image.src = 'graph/hill_short.png';
			obj.height = 106;
			obj.width = 50;
		break;
		case 12:
			obj.height = 152;
			obj.width = 50;
			obj.image.src = 'graph/hill_long.png';
		case 13:
			obj.height = 44;
			obj.width = 50;
			obj.image.src = 'graph/shroom.png';
		break;
	}
	
	obj.setPosition = function(x,y){
		obj.X = x;
		obj.Y = y;
	}
	
	// Draw function
	obj.draw = function(){
		// Try and catch to prevent that a JS error will block the whole game
		try{
			// Draw the tile on the canvas
			// drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
			ctx.drawImage(obj.image, 0, 0, obj.width, obj.height, obj.X, obj.Y, obj.width, obj.height);
			
		} catch(e){console.log(e)} // Do nothing
		
		if(!obj.canFly) obj.placeInField();
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
		
	// Search for the nearest block to stand on
	obj.placeInField = function(){
		startPos = 0;
		groundTiles.some(function(tile){
			// Check for tiles below the player
			if((tile.getColPoint(11)['x'] <= obj.getColPoint(32)['x'] && tile.getColPoint(13)['x'] >= obj.getColPoint(32)['x'])){
				startPos = tile.getColPoint(11)['y'];
				return true;
			}
		});
		
		obj.setPosition(obj.X,startPos-obj.height);
	};
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
					skyTiles.push(new skyTile(xCor,yCor));
					break;
				case 1:
					groundTiles.push(new groundTile(xCor,yCor,"ground_dirt"));
					break;
				case 2:
					groundTiles.push(new groundTile(xCor,yCor,"ground"));
					break;
				case 3:
					groundTiles.push(new groundTile(xCor,yCor,"bridge"));
					break;
				default:
					decorObjects.push(new decorObject(xCor,yCor,map_array[x][y]));
					break;
			}
		}
		gameWidth = map_array[x].length*t_width;
	}
};