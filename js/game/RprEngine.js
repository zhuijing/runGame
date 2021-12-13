var GAME = GAME || {};

GAME.HIGH_MODE = true;
GAME.camera = new PIXI.Point();
GAME.height;
GAME.bundleId = "com.goodboy.runpixierun";
GAME.newHighScore = false;
GAME.RprEngine = function () {
	// this.steve              = new GAME.Steve();
	this.view               = new GAME.RprView(this);

    this.view = new GAME.RprView(this);
    this.bulletMult = 1;
    this.pickupCount = 0;
    this.score = 0;
    this.joyrideMode = false;
    this.joyrideCountdown = 0;
    this.isPlaying = false;
    this.levelCount = 0;
    this.gameReallyOver = false;
    this.isDying = false;
}


GAME.RprEngine.prototype.update = function () {
    this.view.update();
}
