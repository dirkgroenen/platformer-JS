var menu = new (function(){
	var obj = this;
	
	// Vars init
	obj.menuOpened = false;
	
	// draw menu
	obj.draw = function(){
		ctx.beginPath();
		ctx.fillStyle= "rgba(0,0,0,.5)";
		ctx.fillRect(0, 0, c_width, c_height);
		
		// Draw the text
		ctx.font = "bold 55px arial";
		ctx.fillStyle= "rgba(255,255,255,1.0)";
		ctx.fillText("Paused", 400,150);
	}
	
	obj.open = function(){
		obj.menuOpened = true;
		obj.draw();
	}
	
	obj.close = function(){
		obj.menuOpened = false;
	}
});