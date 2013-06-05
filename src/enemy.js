enemies = new Array();

var enemy = function(x,options){
	// Create a new object based on functions
	var obj = this;
	
	// preload images
	new Image().src = 'graph/characters/dino/dinowalk_l.png';
	
	// create the image
	obj.image = new Image();
	obj.width = 50;
	obj.height = 63;
	obj.X = x;
	obj.Y = 0;
	obj.startX = x;
	
	// Walk animation vars, interval prevents that every interval has a new animation
	obj.frames = 1;
    obj.actualFrame = 0;
    obj.interval = 0;
	obj.currentMovement = 'r';
	obj.walkSpeed = 2;
	
	// Enemy life
	obj.life = 3;
	obj.dead = false;
	
	obj.waypointLeft = obj.startX-Number(options[0])*t_width;
	obj.waypointRight = obj.startX+Number(options[2])*t_width;
	obj.enemyType = Number(options[1]);
	
	// Methods
	obj.setPosition = function(x,y){
		obj.X = x;
		obj.Y = y;
	}
	
	obj.walk = function(){
		switch(obj.currentMovement){
			case 'l':
				obj.X -= obj.walkSpeed;
				if(obj.X <= obj.waypointLeft) obj.currentMovement = 'r';
				break;
			case 'r':
				obj.X += obj.walkSpeed;
				if(obj.X >= obj.waypointRight) obj.currentMovement = 'l';
				break;
		}
		obj.interval++;
	}
	
	obj.changeWPs = function(pxs){
		obj.startX -= pxs;
		obj.waypointLeft -= pxs;
		obj.waypointRight -= pxs;
	}
	
	// Create the method that will draw the tile on the given position
	obj.draw = function(){
		if(!obj.dead){
			obj.image.src = 'graph/characters/dino/dinowalk_'+obj.currentMovement+'.png';
		}
		else{
			obj.image.src = 'graph/characters/dino/dinodead.png';
			obj.actualFrame = 0;
		}
		// Try and catch to prevent that a JS error will block the whole game
		try{
			// Draw the tile on the canvas
			// drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
			ctx.drawImage(obj.image, 0, obj.height * obj.actualFrame, obj.width, obj.height, obj.X, obj.Y, obj.width, obj.height);
		} catch(e){} // Do nothing
		
		if (obj.interval == 6 ) {
            (obj.actualFrame == obj.frames) ? obj.actualFrame = 0 : obj.actualFrame++;
			obj.interval = 0;
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

	obj.hit = function(){
		obj.life--;
		obj.walkSpeed -= 0.5;
		return obj.life;
	}
}

	
// Search for the nearest block to stand on
var placeEnemyInField = function(enemy){
	startPos = 0;
	groundTiles.some(function(tile){
		// Check for tiles below the enemy
		if((tile.getColPoint(11)['x'] <= enemy.getColPoint(32)['x'] && tile.getColPoint(13)['x'] >= enemy.getColPoint(32)['x'])){
			startPos = tile.getColPoint(11)['y'];
			return true;
		}
	});
	
	enemy.setPosition(enemy.X,startPos-enemy.height+5);
};

var enemyGenerator = function(enemie_array){
	for(var x = 0;x < enemie_array.length;x++){
		if(enemie_array[x] != 0){
			enemie_options = String(enemie_array[x]).split('.');

			enemies.push(new enemy(x*t_width,enemie_options));
		}
	}
	
	enemies.forEach(function(enemy){
		placeEnemyInField(enemy);
	});
}