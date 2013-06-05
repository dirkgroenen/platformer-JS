// Bullet class
bullets = new Array();
var currentBullets = 0;

var bullet = function(x,y,direction){
	// Create a new object based on functions
	var obj = this;
	
	// create the bullet information
	obj.width = 5;
	obj.height = 5;
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
		
		ctx.beginPath();
		ctx.arc(obj.X, obj.Y, 4, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'black';
		ctx.fill();
	};
	
	obj.remove = function(){
		obj.image = null;
		obj.active = false;
		currentBullets--;
	}
};