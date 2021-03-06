domready(function () {
    onReady();
});
PIXI.Texture.fromFrameId = PIXI.Texture.fromFrame;

window.addEventListener('resize', function () {
    resize();
});
window.onorientationchange = resize;

var GAME_MODE = {
    TITLE: 0,
    COUNT_DOWN: 1,
    PLAYING: 2,
    GAME_OVER: 3,
    INTRO: 4,
    PAUSED: 5
};

var width = 800;
var height = 600;
var isAdding = false;
var loader;
var game;
var mouseX = 0;
var mouseY = 0;
var ratio;
var offsetX;
var offsetY;
var holder;
var loadInterval = false;
var loadCount = 0;
var gameMode = 0;
var countdown;
var logo;
var black;
var interactive = true;
var stressTest;
var pixiLogo;

var gameLoop = false;
var thrustLoop = false;
var thrusters = 0;
var thrustersVolume = 0;
var pauseButton = false;
var pauseScreen = false;

var resumeButton = false;
var restartButton = false;
var soundOnButton = false;
var soundOffButton = false;
var sound = true;


function onReady() {
    stressTest = new PIXI.StressTest(onStressTestComplete);
    resize();
}


function onStressTestComplete() {
    stressTest.end();
    GAME.lowMode = stressTest.result < 40;

    interactive = false;
    document.body.scroll = "no";

    loader = new PIXI.AssetLoader([
        "img/stretched_hyper_tile.jpg",
        "img/SplashAssets.json",
        "img/WorldAssets-hd.json",
        "img/HudAssets-hd.json",
        "img/PixiAssets-hd.json",
        "img/iP4_BGtile.jpg",
        "img/blackSquare.jpg",
        "assets/hud/pausedPanel.png",
        "assets/hud/pixieRevised_controls.png",
        "assets/hud/ContinuePlay.png",
        "assets/hud/RestartPlay.png",
        "assets/hud/soundOff.png",
        "assets/hud/soundOn.png",
        "assets/hud/pause.png",
        "assets/hud/PersonalBest.png"
    ]);

    loader.addEventListener('onComplete', function (event) {
        stressTest.remove();
        init();// 游戏初始化
        clearInterval(loadInterval);
    });

    loader.load();

    resize();
}


function onTap(event) {
    event.originalEvent.preventDefault();

    if (event.target.type !== 'button') {
        if (!interactive) return;

        if (gameMode === GAME_MODE.INTRO) {
            interactive = false;
            gameMode = GAME_MODE.TITLE;
            logo.alpha = 0;
            logo.scale.x = 1.5;
            logo.scale.y = 1.5;
            logo.setTexture(PIXI.Texture.fromFrame("assets/hud/pixieRevised_controls.png"));

            TweenLite.to(logo, 0.1, {
                alpha: 1
            });

            TweenLite.to(logo.scale, 1, {
                x: 1,
                y: 1,
                ease: Elastic.easeOut,
                onComplete: onIntroFaded
            });
        } else if (gameMode === GAME_MODE.TITLE) {
            interactive = false;

            game.start();
            gameMode = GAME_MODE.COUNT_DOWN;

            if (black) {
                TweenLite.to(black, 0.2, {
                    alpha: 0
                });
            }

            TweenLite.to(logo, 0.3, {
                alpha: 0,
                onComplete: function () {
                    logo.visible = false;
                    game.view.showHud();

                }
            });
        } else if (gameMode === GAME_MODE.GAME_OVER) {
            interactive = false;

            // game.view.stage.addChild(black);

            TweenLite.to(black, 0.3, {
                alpha: 1,
                onComplete: function () {
                    game.steve.normalMode();
                    game.joyrideComplete();

                    game.steve.position.x = 0;
                    GAME.camera.x = game.steve.position.x - 100;
                    game.reset();
                    logo.visible = false;
                    gameMode = GAME_MODE.COUNT_DOWN;

                    TweenLite.killTweensOf(GAME.camera);
                    GAME.camera.zoom = 1;

                    TweenLite.to(black, 0.3, {
                        alpha: 0,
                        onComplete: function () {
                            logo.visible = false;
                            game.start();
                            FidoAudio.fadeIn('gameMusic');
                            countdown.startCountDown(onCountdownComplete);
                        }
                    });
                }
            });
        } else {
            // handle our jump sound
            thrusters = true;
            if (game.isPlaying) game.steve.jump();
        }
    }
}

function onIntroFaded() {
    interactive = true;
}
function init() {
    gameMode = GAME_MODE.INTRO;
    interactive = false; // 初始的时候不可点击

    game = new GAME.RprEngine();

    document.body.appendChild(game.view.renderer.view); // 游戏主场景
    game.view.renderer.view.style.position = "absolute";
    game.view.renderer.view.webkitImageSmoothingEnabled = false

    requestAnimFrame(update);

    
    black = new PIXI.Sprite.fromImage("img/blackSquare.jpg");
    this.game.view.hud.addChild(black); // 初始场景的半透明蒙层

    TweenLite.to(black, 0.3, {
        alpha: 0.75,
        delay: 0.5
    });

    logo = PIXI.Sprite.fromFrame("runLogo.png");
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    logo.alpha = 0;
    this.game.view.hud.addChild(logo);// 游戏的logo

    TweenLite.to(logo, 0.1, {
        alpha: 1,
        delay: 0.6,
        onComplete: onIntroFaded
    });

    this.game.view.container.mousedown = this.game.view.container.touchstart = function (event) {
        onTap(event);
    }
    this.game.view.container.mouseup = this.game.view.container.touchend = function (event) {
        onTouchEnd(event);
    }
    
    resize();
}
function onTouchEnd(event) {
    event.originalEvent.preventDefault();
    thrusters = false;
    if (game.isPlaying) game.steve.fall();
}

function resize() {
    window.scrollTo(0, 0);

    var h = 640;
    var width = window.innerWidth || document.body.clientWidth;
    var height = window.innerHeight || document.body.clientHeight;
    var ratio = height / h;

    if (game) {
        var view = game.view.renderer.view;
        view.style.height = h * ratio + "px";

        var newWidth = (width / ratio);

        view.style.width = width + "px";

        this.logo.position.x = newWidth / 2;
        this.logo.position.y = h / 2 - 20;

        if (black) {
            black.scale.x = newWidth / 16;
            black.scale.y = h / 16;
        }

      

        game.view.resize(newWidth, h);

    }

    GAME.width = (width / ratio);
    GAME.height = h;
}
function onIntroFaded() {
    interactive = true;
}


function update() {
    game.update();

    requestAnimFrame(update);

}


function showGameover()
{
    logo.visible = true;
    TweenLite.to(logo, 0.3, {
        alpha:1, 
        onComplete : onGameoverShown
    });
}

function onGameoverShown()
{
    this.isGameReallyOver = true;
	interactive = true;
}