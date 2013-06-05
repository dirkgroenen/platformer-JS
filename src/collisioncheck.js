// Ceck for player collisions with platforms
// Player getColPoint([1-3][1-3]):
// 1:[1-3]: top, middle, bottom
// 2:[1-3] left, middle, right
var checkCollision = function(){
	// Check if there is a box on his head or under his ass
	if(bullets.length != 0 || player.isMoving || player.isFalling || player.isJumping){
		groundTiles.forEach(function(tile){
			// Check for a box on the left or right
			if(player.isMoving || player.isFalling || player.isJumping){
				// Check for tiles on the right side
				if(((player.getColPoint(23)['x'] >= tile.getColPoint(21)['x'] && player.getColPoint(22)['x'] <= tile.getColPoint(23)['x']) || (player.getColPoint(21)['x'] <= tile.getColPoint(23)['x'] && player.getColPoint(22)['x'] >= tile.getColPoint(23)['x'])) && (player.getColPoint(23)['y'] <= tile.getColPoint(31)['y'] && player.getColPoint(23)['y'] >= tile.getColPoint(11)['y'])){
					// Check the players Y position with the tiles, it's no collision as long as the players Y position is lower the the ground top position
					player.stopMoving();
					player.stopCamera = true;
				}
				
				
				// Check the tiles under the player's X
				if((player.getColPoint(32)['x'] >= tile.getColPoint(11)['x'] && player.getColPoint(32)['x'] <= tile.getColPoint(13)['x']) || (player.getColPoint(33)['x'] >= tile.getColPoint(11)['x'] && player.getColPoint(33)['x'] <= tile.getColPoint(13)['x'])){
					// Check the players Y position with the tiles, it's no collision as long as the players Y position is lower the the ground top position
					if((player.getColPoint(32)['y'] >= tile.getColPoint(12)['y']) || (player.getColPoint(31)['y'] >= tile.getColPoint(11)['y']) || (player.getColPoint(33)['y'] >= tile.getColPoint(13)['y'])){
						if(tile.getColPoint(12)['y'] > player.getColPoint(21)['y']){
							player.stopFalling();
						}
					}
					
					// Check if je jumps or walks against a tile
					if(player.getColPoint(12)['y'] <= tile.getColPoint(32)['y'] && tile.getColPoint(22)['y'] < player.getColPoint(22)['y']){
						player.stopJump();
					}
				}
				
			}
			
			// Check collisions for active bullets
			if(bullets.length != 0){
				bullets.forEach(function(bullet){
					if((bullet.X >= 0 && bullet.X <= 1000)){
						// Check for hit on rock
						if(((bullet.X >= tile.getColPoint(11)['x']-bullet.width && bullet.X <= tile.getColPoint(11)['x']) || (bullet.X <= tile.getColPoint(11)['x']-bullet.width && bullet.X >= tile.getColPoint(13)['x'])) && (bullet.Y <= tile.getColPoint(31)['y'] && bullet.Y >= tile.getColPoint(11)['y'])){
							bullet.remove();
						}
						// Check for hit with enemy
						if(enemies != 0){
							enemies.forEach(function(enemie){
								if((enemie.X <= 1000 && enemie.X >= 0) && (bullet.X >= enemie.getColPoint(11)['x'] && bullet.X <= enemie.getColPoint(13)['x']) && bullet.active && !enemie.dead){
									if(bullet.Y >= enemie.getColPoint(12)['y'] && bullet.Y <= enemie.getColPoint(32)['y']){
										bullet.remove();
										gameStats.bulletHit++;
										if(enemie.hit() <= 0){
											enemie.dead = true;
											gameStats.enemiesKilled++;
										}
									}
								}
							});
						}
					}
				});
			}
		});
	}
	
	if(enemies != 0){
		enemies.forEach(function(enemie){
			if((enemie.X <= 1000 && enemie.X >= 0) && ((enemie.X+15)-player.X <= enemie.width && (enemie.X-10)-player.X >= -enemie.width) && !enemie.dead){
				if(player.getColPoint(22)['y'] >= enemie.getColPoint(12)['y'] && player.getColPoint(22)['y'] <= enemie.getColPoint(32)['y']){
					player.hitByEnemy(enemie);
				}
			}
		});
	}	
};