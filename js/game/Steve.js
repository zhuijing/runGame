var GAME = GAME || {};
GAME.Steve = function () {
	this.position = new PIXI.Point();
	this.baseSpeed = 8;
	this.speed = new PIXI.Point(this.baseSpeed, 0);
	this.gravity = 0.3;
	this.level = 1
	this.position.y = 477;

}
GAME.Steve.prototype.update = function () {
	this.updateRunning();
}

GAME.Steve.prototype.updateRunning = function () {
	this.speed.y += this.gravity * GAME.time.DELTA_TIME;

	this.position.x += this.speed.x * GAME.time.DELTA_TIME * this.level;
	this.position.y += this.speed.y * GAME.time.DELTA_TIME;

	GAME.camera.x = this.position.x - 100;
}