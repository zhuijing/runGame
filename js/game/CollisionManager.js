/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

var GAME = GAME || {};

var laserCount = 0;

GAME.CollisionManager = function (engine) {
	this.engine = engine;
}

// constructor
GAME.CollisionManager.constructor = GAME.CollisionManager;

GAME.CollisionManager.prototype.update = function () {
	this.playerVsFloor();
}

GAME.CollisionManager.prototype.playerVsFloor = function () {
	var floors = this.engine.floorManager.floors;
	var steve = this.engine.steve;

	var max = floors.length;
	steve.onGround = false;

	if (steve.position.y > 610) {
		if(this.engine.isPlaying)
		{
			steve.boil();
			this.engine.view.doSplash();
			this.engine.gameover();
			console.log(`333`, 333)
		}
		else
		{
			steve.speed.x *= 0.95;
			
            if(!interactive)
			{
                interactive = true;
            }
            
            if(steve.bounce === 0) {
				console.log(`1111`, 1111)
                steve.bounce++;
                steve.boil();
                this.engine.view.doSplash();
            }

			return;
		}
	}



	for (var i = 0; i < max; i++) 
	{
		var floor = floors[i];
		var xdist = floor.x - steve.position.x + 1135;
		
		if(steve.position.y > 477)
		{
			if(xdist > 0 && xdist < 1135)
			{
				if(steve.isDead)
				{
					console.log(`1`, 1)
					steve.bounce++;
                    
					if(steve.bounce > 2)
					{						
						return;
					}
					steve.view.setTexture(steve.crashFrames[steve.bounce])
					steve.speed.y *= -0.7;
					steve.speed.x *= 0.8;
					
					if(steve.rotationSpeed > 0)
					{
						steve.rotationSpeed = Math.random() * -0.3;
					}
					else if(steve.rotationSpeed === 0)
					{
						steve.rotationSpeed = Math.random() * 0.3;
					}
					else
					{
						steve.rotationSpeed = 0;
					}
				}
				else
				{
					steve.speed.y = -0.3;
				}
				
				if(!steve.isFlying)
				{
					steve.position.y = 478;
					steve.onGround = true;
					
				}	
			}
		}
	}



	if (steve.position.y < 0) {
		steve.position.y = 0;
		steve.speed.y *= 0;
	}
}