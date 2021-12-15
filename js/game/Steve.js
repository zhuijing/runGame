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

GAME.Steve.prototype.updateRunning = function()
{

	if(this.isActive)
	{
		this.isFlying = true;
	}
	
	var oldSpeed = this.speed.y;
    
	if(this.isFlying)
	{
		this.accel = 0.6;
		this.speed.y -= this.accel  * GAME.time.DELTA_TIME;
		if(this.speed.y > 0) this.speed.y -= 0.3 * GAME.time.DELTA_TIME;
	}
	else
	{
		if(this.speed.y < 0) this.speed.y += 0.05 * GAME.time.DELTA_TIME;
	}
	
	this.speed.y += this.gravity  * GAME.time.DELTA_TIME;
	
	if(this.speed.y > 8) this.speed.y = 8;
	if(this.speed.y < -9) this.speed.y = -9;

    var accel = this.speed.y - oldSpeed;
	this.position.x += this.speed.x * GAME.time.DELTA_TIME * this.level;
	this.position.y += this.speed.y * GAME.time.DELTA_TIME;
	
	
	GAME.camera.x = this.position.x - 100;
	
}
