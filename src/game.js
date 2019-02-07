
(function() {
    // stage items and constants
    let stage = null;
    let canvas = null;
    const FRAME_RATE = 26;
    const SNAKE_MAX_SPEED = 5;
    // timer for duck to fly around screen
    let duckTimer = null;
    // how many ducks have been shot?
    let duckShot = 0;
    // Max number of ducks per round, always 10
    const DUCK_MAX = 10;
    // a pool of preloaded ducks to come out
    let duckPool = [];
    // keep track of what round you're on.
    let roundNum = 1;
    
    let assetManager;
    let gameScreen;
    let duck;
    let dog;

    function onReady(e) {
        console.log(">> setup");

        // getting background sprite for stage
        gameScreen = new GameScreen(stage, assetManager);
        dog = new Dog(stage, assetManager);
        dog.laugh();

        // duck = assetManager.getSprite("spritesheet");
        // duck.gotoAndPlay("laughing");
        // duck.x = 600;
        // duck.y = 350;
        // stage.addChildAt(duck, 0);

        createjs.Ticker.framerate = FRAME_RATE;
        createjs.Ticker.on("tick", onTick);

    }

    function onTick(e) {
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        dog.enterLaugh();
        stage.update();
    }

    function main() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("myCanvas");
        // set canvas to as wide/high as the browser window
        canvas.width = 1200;
        canvas.height = 650;
        // create stage object
        stage = new createjs.StageGL(canvas);
        stage.setClearColor("#33ABF9");
        stage.enableMouseOver(10);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.on("allAssetsLoaded", onReady);
        // load the assets
        assetManager.loadAssets(manifest);
    }

    main();
})();
