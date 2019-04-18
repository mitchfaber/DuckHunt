
(function() {
    // stage items and constants
    let stage = null;
    let canvas = null;
    const FRAME_RATE = 26;

    // a pool of preloaded ducks to come out
    let duckPool = [];

    // ammo pool
    let shots = [];

    // how many waves in the round? (always 10)
    let waves = [];

    // current wave number
    let waveNum = 0;

    // events
    let eventWaveEnd;
    let eventAmmoGone;

    // are there any ducks left?
    let ducksLeft = true;
    
    // keep track of what round you're on.
    let roundNum = 1;
    
    // the asset manager that helps with sprites and the spritesheet.
    let assetManager;

    // title screen - Duck Hunt and bar.
    let titleScreen;

    // game screen variable
    let gameScreen;

    // dog variable
    let dog;

    // what gamePhase are we in?
    // 0 - doing nothing, title screen showing.
    // 1 - title screen gone, game setup.
    // 2 - ROUND start
    // 3 - dog jumping into screen. Used to time the dog jumping into the grass.
    // 4 - WAVE start
    let gamePhase = 0;

    function onReady(e) {
        gamePhase = 0;
        console.log(">> setup");
        
        // adding duck icons to array and displaying them for each wave.
        // x makes each duck icon the same space apart.
        let x = 436;
        for (let i=0;i<9;i++) {
            waves.push(new Hit(stage, assetManager,x,540));
            x = x+40;
        }
        
        // getting background sprite for stage
        titleScreen = new TitleScreen(stage, assetManager);

        // Creating dog object
        dog = new Dog(stage, assetManager);
        for (let i = 0; i<2;i++) {
            if (roundNum == 1) {
                duckPool.push(new GreenDuck(stage, assetManager, 5));
            }
        }
        


        createjs.Ticker.framerate = FRAME_RATE;
        createjs.Ticker.on("tick", onTick);

        //---------------------------------------------------- EVENT LISTENERS 

        // starting setup, removed title screen
        stage.on("startGame", (e) => {
            stage.removeAllChildren();
            setupGame();
            gamePhase = 1;
            e.remove();
        });

        // starting dog jumping in.
        stage.on("start", (e) => {
            dog.jump(-100,340,-10,10);
            gamePhase = 2;
            e.remove();
        });

        // once dog has landed, change phase so he knows to jump into the grass.
        stage.on("dogLand", (e) => {
            gamePhase = 3;
            e.remove();
        });

        // once dog is gone, he dispatches an event so the GUI can become visible,
        // and this also starts the wave.
        stage.on("dogGone", (e) => {
            gamePhase = 4;
            waveStart();
            e.remove();
        });

        // if the duck is shot, this updates all related GUI.
        stage.on("duckDie", (e) => {
            gameScreen.updateScore();
        });

        // every time the screen is clicked during gamePhase 4, this gets dispatched
        stage.on("shotFired", (e) => {

            if (shots.length > 1) {
                shots.pop().update();
            } else if (shots.length > 0){
                shots.pop().update();
                stage.dispatchEvent(eventAmmoGone);
            }
            // Can't remove e, or else this will only send for one click
            // e.remove();
        });

        // if the ammo is gone, this event is run to check if they 
        // had a good or bad wave.
        stage.on("ammoGone", (e) => {
            if (ducksLeft) {
                dog.enterLaugh();
            }
            stage.dispatchEvent(eventWaveEnd);

            e.remove();
        });

        // at the end of a wave, change gamePhase to stop duck icon from flashing,
        // as well as increasing waveNum.
        stage.on("waveEnd", (e) => {
            console.log("Wave end");
            gamePhase = 4;
            waves[waveNum]._sprite.stop();
            waveNum++;
            e.remove();
        });

        // starting next wave after the dog finishes laughing.
        stage.on("laughDone", (e) => {
            console.log("Laugh done");
            waveStart();
            e.remove();
        });
        
    }

    function setupGame() {
        gameScreen = new GameScreen(stage, assetManager, gamePhase);
    }

    function waveStart() {
        // setting up events.
        eventAmmoGone = new createjs.Event("ammoGone", true);
        eventWaveEnd = new createjs.Event("waveEnd", true);

        duckPool.forEach(duck => {
            duck.enterStage(600,600);
        });
        // Adding ammo to array.
        shots.push(new Shot(stage, assetManager, 100,540));
        shots.push(new Shot(stage, assetManager, 140,540));
        shots.push(new Shot(stage, assetManager, 180,540));
        gameScreen.addGUI(shots, waves);

        gamePhase = 3;
    }

    function onTick(e) {
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        titleScreen.updateMe();
        if (gamePhase == 1){
            gameScreen.roundStart();
        } 
        if (gamePhase == 3) {
            waves[waveNum].flash();
        }
        duckPool.forEach(duck => {
            duck.updateMe();
        });
        dog.updateMe(gamePhase);
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
