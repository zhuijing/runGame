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
	var steve = this.engine.steve;
	if (steve.position.y > 650) {
		steve.speed.x *= 0.95;
	}
}