
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
    let titleScreen;
    let gameScreen;
    let duck;
    let dog;

    function onReady(e) {
        console.log(">> setup");

        // getting background sprite for stage
        // titleScreen = new TitleScreen(stage, assetManager);
        gameScreen = new GameScreen(stage, assetManager);
        dog = new Dog(stage, assetManager);
        // titleScreen.getBackground.on("click", onStart);
        // titleScreen.on("click", onStart);
        createjs.Ticker.framerate = FRAME_RATE;
        createjs.Ticker.on("tick", onTick);
        onStart();
    }

    function onStart(e) {
        console.log("clicked!");
        gameScreen.roundStart();
    }

    function roundEnd() {
        dog.enterLaugh();
        dog.laugh();
    }

    function onTick(e) {
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        // titleScreen.titleSlide();
        gameScreen.roundStart();
        
        stage.update();
    }

    function main() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("myCanvas");
        canvas.width = 1200;
        canvas.height = 650;
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
