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

GAME.CollisionManager.prototype.playerVsFloor = function()
{
	var floors = this.engine.floorManager.floors;
	var steve = this.engine.steve;
	
	var max = floors.length;
	steve.onGround = false;
	
	if(steve.position.y > 610)
	{
		if(this.engine.isPlaying)
		{
			// steve.boil();
			// this.engine.view.doSplash();
			// this.engine.gameover();
		}
		else
		{
			steve.speed.x *= 0.95;
		}
	}
	
	

    if(steve.position.y < 0)
    {
         steve.position.y = 0;
         steve.speed.y *= 0;
    }
}
