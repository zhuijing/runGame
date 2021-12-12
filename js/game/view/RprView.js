
var GAME = GAME || {};

GAME.RprView = function (engine) {
	this.engine = engine;

    this.renderer = PIXI.autoDetectRenderer(600, 800);
	GAME.HIGH_MODE = (this.renderer instanceof PIXI.WebGLRenderer);

	this.stage = new PIXI.Stage();

	this.container = new PIXI.DisplayObjectContainer();
	this.container.hitArea = this.stage.hitArea;
	this.container.interactive = true;

	this.hud = new PIXI.DisplayObjectContainer();
	this.game = new PIXI.DisplayObjectContainer();
	this.gameFront = new PIXI.DisplayObjectContainer();

	// this.container.addChild(this.game);
	this.container.addChild(this.gameFront); // 初始场景的🔥的效果

	this.stage.addChild(this.container);

	this.count = 0;
	this.zoom = 1;

	this.white = PIXI.Sprite.fromImage("img/whiteSquare.png");
	GAME.xOffset = this.container.position.x;

}

GAME.RprView.constructor = GAME.RprView;



GAME.RprView.prototype.update = function () {
	this.count += 0.01;

	if (!GAME.lowMode) {
		var ratio = (this.zoom - 1);
		var position = -GAME.width / 2
		var position2 = 0;
		var inter = position + (position2 - position) * ratio;

		this.container.position.x = inter * this.zoom;
		this.container.position.y = 0

		this.container.position.x += GAME.width / 2;
		this.container.position.y += GAME.height / 2;

		GAME.xOffset = this.container.position.x;

		if (this.container.position.y > 0) this.container.position.y = 0;
		var yMax = -GAME.height * this.zoom;
		yMax += GAME.height;

		if (this.container.position.y < yMax) this.container.position.y = yMax;

		this.container.scale.x = this.zoom;
		this.container.scale.y = this.zoom;
	}

	this.renderer.render(this.stage);
}

GAME.RprView.prototype.resize = function (w, h) {
	//    console.log("Width ->" + w);
	//    console.log("Height -> " + h);

	GAME.width = w;
	GAME.height = h;

	this.renderer.resize(w, h);

}