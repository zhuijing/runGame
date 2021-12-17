var GAME = GAME || {};
GAME.Steve = function () {
	this.position = new PIXI.Point();

	this.position = new PIXI.Point();
	
	this.runningFrames = [
        PIXI.Texture.fromFrame("characterRUNscaled_01.png"),
        PIXI.Texture.fromFrame("characterRUNscaled_02.png"),
        PIXI.Texture.fromFrame("characterRUNscaled_03.png"),
        PIXI.Texture.fromFrame("characterRUNscaled_04.png"),
        PIXI.Texture.fromFrame("characterRUNscaled_05.png"),
        PIXI.Texture.fromFrame("characterRUNscaled_06.png"),
        PIXI.Texture.fromFrame("characterRUNscaled_07.png"),
        PIXI.Texture.fromFrame("characterRUNscaled_08.png"),
        PIXI.Texture.fromFrame("characterRUNscaled_09.png")
    ];
	
	this.flyingFrames = [
        PIXI.Texture.fromFrame("characterFLATflying_01.png"),
        PIXI.Texture.fromFrame("characterFLATflying_02.png"),
        PIXI.Texture.fromFrame("characterFLATflying_03.png")
    ];
	
	this.crashFrames = [
        PIXI.Texture.fromFrame("characterFALLscaled3.png"),
        PIXI.Texture.fromFrame("characterFALLscaled1.png"),
        PIXI.Texture.fromFrame("characterFALLscaled3.png")
    ];

	this.view = new PIXI.MovieClip(this.flyingFrames);
	this.view.animationSpeed = 0.23;
	
	this.view.anchor.x = 0.5;
	this.view.anchor.y = 0.5;
	

	this.position.y = 477;
	this.ground = 477;
	this.gravity = 0.3;
	
	this.baseSpeed = 8;
	this.speed = new PIXI.Point(this.baseSpeed, 0);
	
	this.activeCount = 0;
	this.isFlying = false;
	this.accel =0;
	
	this.width = 26
	this.height = 37;
	
	this.onGround = false;
	this.rotationSpeed = 0;
	this.joyRiding = false;
	this.level = 1;
	this.realAnimationSpeed = 0.23;
    
    this.volume = 0.3;

}
GAME.Steve.prototype.update = function () {
	this.updateRunning();
}


GAME.Steve.prototype.updateRunning = function()
{
	this.view.animationSpeed = this.realAnimationSpeed * GAME.time.DELTA_TIME * this.level;

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
	
	if(this.onGround !== this.onGroundCache)
	{
		this.onGroundCache = this.onGround;
		
		if(this.onGround)
		{
			this.view.textures = this.runningFrames;
            if(this.joyRiding === true) 
            {
            }
            else
            {
            }
		}
		else
		{
			this.view.textures = this.flyingFrames;
		}
	}
	
	GAME.camera.x = this.position.x - 100;
	
	this.view.position.x = this.position.x - GAME.camera.x;
	this.view.position.y = this.position.y - GAME.camera.y;
	
	this.view.rotation += (this.speed.y * 0.05 - this.view.rotation) * 0.1;
}

