var GAME = GAME || {};

GAME.HIGH_MODE = true;
GAME.camera = new PIXI.Point();
GAME.height;
GAME.bundleId = "com.goodboy.runpixierun";
GAME.newHighScore = false;
GAME.RprEngine = function () {
	this.steve              = new GAME.Steve();
	this.view               = new GAME.RprView(this);
	this.collisionManager   = new GAME.CollisionManager(this);
    // this.steve.view.visible =  false;

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
    this.steve.update();
    this.collisionManager.update();
    this.view.update();
    
}




Time = function()
{
	this.DELTA_TIME = 1;	
	this.lastTime = Date.now();
    this.speed = 1;
}

Time.constructor = Time;

Time.prototype.update = function()
{
    var time = Date.now();
    var currentTime =  time;
    var passedTime = currentTime - this.lastTime;

    this.DELTA_TIME = ((passedTime) * 0.06);
    this.DELTA_TIME *= this.speed;

    if(this.DELTA_TIME > 2.3) this.DELTA_TIME = 2.3;

    this.lastTime = currentTime;
}

GAME.time = new Time();