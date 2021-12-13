
Partical = function()
{
	PIXI.Sprite.call(this, PIXI.Texture.fromFrameId("starPops0004.png"));
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.speed = new PIXI.Point();
}

Partical.constructor = Partical;
Partical.prototype = Object.create( PIXI.Sprite.prototype );