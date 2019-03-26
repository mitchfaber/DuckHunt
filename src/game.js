
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
    let gamePhase;

    function onReady(e) {
        console.log(">> setup");

        // getting background sprite for stage
        titleScreen = new TitleScreen(stage, assetManager);
        dog = new Dog(stage, assetManager);
        duck = new GreenDuck(stage, assetManager);
        for (let i = 0; i<10;i++) {
            if (roundNum == 1) {
                console.log("looping " + i);
                duckPool.push(new GreenDuck(stage, assetManager));
            }
            
        }
        
        createjs.Ticker.framerate = FRAME_RATE;
        createjs.Ticker.on("tick", onTick);
    }

    function setupGame() {
        gameScreen = new GameScreen(stage, assetManager);
        
    }

    function gameStart() {
        duckPool.forEach(duck => {
            duck.enterStage(600,600,Mover.UP);
        });
    }

    function roundEnd() {
        dog.enterLaugh();
        dog.laugh();
    }

    function onTick(e) {
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        if (gamePhase == 0) {
            titleScreen.titleSlide();
            stage.on("startGame", () => {
                stage.removeAllChildren();
                setupGame();
                gamePhase = 1;
                dog.jump(-100,340,-10,10);
            });
        } 
        else if (gamePhase == 1) {
            gameScreen.roundStart();
            stage.on("start", () => {
                gamePhase = 2;
            });
            
        } else if (gamePhase == 2) {
            dog.updateMe();
        }
        stage.on("dogGone", (e) => {
            gameScreen.addGUI();
            gameStart();
            e.remove();
            
        });
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
        gamePhase = 0;
    }

    main();
})();
