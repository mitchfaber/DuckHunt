
(function() {
    // stage items and constants
    let stage = null;
    let canvas = null;
    const FRAME_RATE = 26;
    // a pool of preloaded ducks to come out
    let duckPool = [];
    let shots = [];

    
    // keep track of what round you're on.
    let roundNum = 1;
    
    let assetManager;
    let titleScreen;
    let gameScreen;
    let dog;
    let gamePhase = 0;

    function onReady(e) {
        gamePhase = 0;
        console.log(">> setup");
        shots.push(new Shot(stage, assetManager, 100,540));
        shots.push(new Shot(stage, assetManager, 130,540));
        shots.push(new Shot(stage, assetManager, 160,540));
        // getting background sprite for stage
        titleScreen = new TitleScreen(stage, assetManager);
        dog = new Dog(stage, assetManager);
        for (let i = 0; i<10;i++) {
            if (roundNum == 1) {
                duckPool.push(new GreenDuck(stage, assetManager, 5));
            }
        }
            
        createjs.Ticker.framerate = FRAME_RATE;
        createjs.Ticker.on("tick", onTick);


        stage.on("startGame", (e) => {
            stage.removeAllChildren();
            setupGame();
            gamePhase = 1;
            e.remove();
        });

        stage.on("start", (e) => {
            dog.jump(-100,340,-10,10);
            gamePhase = 2;
            e.remove();
        });

        stage.on("dogGone", (e) => {
            gamePhase=3;
            gameScreen.addGUI(shots);
            gameStart();
            e.remove();
        });

        stage.on("shotFired", (e) => {
            if (shots.length >= 1) {
                shots.pop().update();
            }
            // Can't remove e, or else this will only send for one click
            // e.remove();
        });

        stage.on("duckDie", (e) => {
            gameScreen.updateGUI();
        });
        
    }

    function setupGame() {
        gameScreen = new GameScreen(stage, assetManager);
    }

    function gameStart() {
        duckPool.forEach(duck => {
            duck.enterStage(600,600);
            console.log("duck entering stage!");
        });
    }

    function flyAway() {
        dog.enterLaugh();
        dog.laugh();
    }

    function onTick(e) {
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        titleScreen.updateMe();
        if (gamePhase == 1){
            gameScreen.roundStart();
        }
        if (gamePhase >= 2) {
            dog.updateMe();
        }
        duckPool.forEach(duck => {
            duck.updateMe();
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
        
    }

    main();
})();
