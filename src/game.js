
(function() {
    // stage items and constants
    let stage = null;
    let canvas = null;
    const FRAME_RATE = 26;

    // a pool of preloaded ducks to come out
    let duckPool = [];
    let duckCount = 2;

    // ammo pool
    let shots = [];

    // how many waves in the round? (always 10)
    let waves = [];

    // current wave number
    let waveNum = 0;

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

    // ammo gone event
    let eventAmmoGone;
    let eventWaveEnd;
    let eventDucksGone;

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
        let x = 405;
        for (let i=0;i<10;i++) {
            waves.push(new Hit(stage, assetManager,x,540));
            x = x+45;
        }
        
        // getting background sprite for stage
        titleScreen = new TitleScreen(stage, assetManager);

        // Creating dog object
        dog = new Dog(stage, assetManager);

        createjs.Ticker.framerate = FRAME_RATE;
        createjs.Ticker.on("tick", onTick);


        // creating event for ammo gone
        eventAmmoGone = new createjs.Event("ammoGone", true);
        eventWaveEnd = new createjs.Event("waveEnd", true);
        eventDucksGone = new createjs.Event("ducksGone", true);
        // starting setup, removed title screen
        stage.on("startGame", (e) => {
            stage.removeAllChildren();
            setupGame();
            gamePhase = 1;
            e.remove();
        });

        // starting dog jumping in.
        stage.on("start", onRoundStart);

        // once dog has landed, change phase so he knows to jump into the grass.
        stage.on("dogLand", onDogLand);

        // once dog is gone, he dispatches an event so the GUI can become visible,
        // and this also starts the wave.
        stage.on("dogGone", onWaveStart);

        stage.on("duckDie", onDuckKill);

        // if the duck is shot, this updates all related GUI.
        

        // every time the screen is clicked during gamePhase 3, this gets dispatched
        stage.on("shotFired", (e) => {
            if (gamePhase == 3) {
                if (shots.length > 1) {
                    shots.pop().update();
                } else if (shots.length > 0){
                    shots.pop().update();
                    stage.dispatchEvent(eventAmmoGone);
                }
            }
        });
    }

    function setupGame() {
        gameScreen = new GameScreen(stage, assetManager, gamePhase);
    }

    function reset() {
        duckCount = 2;
        shots.forEach(shot => {
            stage.removeChild(shot._sprite);
        });
        shots = [];
        duckPool = [];
        for (let i = 0; i<2;i++) {
            if (duckPool.length < 2) {
                duckPool.push(new GreenDuck(stage, assetManager));
            }
        }
        stage.on("waveEnd", onWaveEnd);
        
        stage.on("laughDone", onLaughDone);
        stage.on("ammoGone", onAmmoGone);
        stage.on("ducksGone", onAmmoGone);
        duckPool.forEach(duck => {
            duck.enterStage(600,600);
        });
        // Adding ammo to array.
        if (shots.length < 2) {
            shots.push(new Shot(stage, assetManager, 100,540));
            shots.push(new Shot(stage, assetManager, 140,540));
            shots.push(new Shot(stage, assetManager, 180,540));
        }
        gameScreen.addGUI(shots, waves);
        duckPool.forEach(duck => {
            duck.startMe(0);
        });
        gamePhase = 3;
    }

    // --------------------------------------------------------------- EVENT HANDLERS

    function onDuckKill(e) {
        console.log("duck Die");
        gameScreen.updateScore();
        duckPool.pop();
        duckCount--;
        console.log(duckPool.length);
        if (duckCount == 0) {
            stage.dispatchEvent(eventDucksGone);
        }
        // e.remove();
    }

    function onAmmoGone(e) {
        if (duckCount >= 1) {
            dog.enterLaugh();
            console.log(waves[0]);
            waves[waveNum].badWave();
            if (duckCount == 1) {
                dog.oneDuck(1);
            }
        } else if(duckCount == 0) {
            waves[waveNum].goodWave();
            dog.oneDuck(2);
        }
        stage.dispatchEvent(eventWaveEnd);
        e.remove();
    }

    function onLaughDone(e) {
        stage.removeChild(dog);
        reset();
        e.remove();
    }

    function onWaveStart(e) {
        gamePhase = 4;
        reset();
        e.remove();
    }

    function onWaveEnd(e) {
        e.remove();
        duckPool.forEach(duck => {
            duck.remove();
        });
        duckPool = [];
        gamePhase = 4;
        waveNum++;
    }

    function onDogLand(e) {
        gamePhase = 3;
        e.remove();
    }

    function onRoundStart(e) {
        dog.jump(-100,340,-10,10);
        gamePhase = 2;
        e.remove();
    }

    function onTick(e) {
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        titleScreen.updateMe();
        if (gamePhase == 1){
            gameScreen.roundStart();
        }
        duckPool.forEach(duck => {
            duck.update();
        });
        dog.updateMe(gamePhase);
        stage.update();
    }

    // ---------------------------------------------------------- MAIN FUNCTION
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
