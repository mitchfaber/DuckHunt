
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
    

    let assetManager;
    let background;

    function onReady(e) {
        console.log(">> setup");

        // getting background sprite for stage
        background = assetManager.getSprite("spritesheet");
        background.gotoAndStop("stage");
        background.x = 600;
        background.y = 300;
        stage.addChild(background);

        createjs.Ticker.framerate = FRAME_RATE;
        createjs.Ticker.on("tick", onTick);

    }

    function onTick(e) {
        stage.update();
    }

    function main() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("myCanvas");
        // set canvas to as wide/high as the browser window
        canvas.width = 1200;
        canvas.height = 700;
        // create stage object
        stage = new createjs.StageGL(canvas);
        stage.enableMouseOver(10);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.on("allAssetsLoaded", onReady);
        // load the assets
        assetManager.loadAssets(manifest);
    }

    main();
})();
