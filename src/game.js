
(function() {
    // stage items and constants
    let stage = null;
    let canvas = null;
    const FRAME_RATE = 26;

    // a pool of preloaded ducks to come out
    let duckCount = 2;
    let ducksHit = 0;

    // perfect score
    let perfect = 1000;

    // How many ducks need to be hit
    let hitRequired = 6;
    let hits = 0;

    // ammo pool
    let shots = [];

    // how many waves in the round? (always 10)
    let waves = [];

    // current wave number
    let waveNum = 0;

    // are there any ducks left?
    let ducksLeft = true;
    let duck1;
    let duck2;
    
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
    let eventRoundEnd;
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
        eventRoundEnd = new createjs.Event("roundEnd", true);
        // starting setup, removed title screen
        stage.on("startGame", (e) => {
            stage.removeAllChildren();
            setupGame();
            roundStart();
            e.remove();
        });

        // once dog is gone, he dispatches an event so the GUI can become visible,
        // and this also starts the wave.
        

        stage.on("duckDie", onDuckKill);
        
        // every time the screen is clicked during gamePhase 3, this gets dispatched
        stage.on("shotFired", (e) => {
            if (gamePhase == 3) {
                createjs.Sound.play("Shoot");
                if (shots.length > 1) {
                    shots.pop().update();
                } else if (shots.length > 0 && duckCount > 0){
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
        stage.removeChild(dog._sprite);
        ducksHit = 0;
        shots.forEach(shot => {
            stage.removeChild(shot._sprite);
        });
        shots = [];
        if (roundNum <= 5) {
            if (waveNum < 5) {
                duck1 = new GreenDuck(stage, assetManager, gameScreen, roundNum);
                duck2 = new GreenDuck(stage, assetManager, gameScreen, roundNum);
            } else {
                duck1 = new GreenDuck(stage, assetManager, gameScreen, roundNum);
                duck2 = new PurpleDuck(stage, assetManager, gameScreen, roundNum);
            }
        } else if (roundNum > 5 && roundNum <= 10) {
            if (waveNum < 5) {
                duck1 = new PurpleDuck(stage, assetManager, gameScreen, roundNum);
                duck2 = new PurpleDuck(stage, assetManager, gameScreen, roundNum);
            } else {
                duck1 = new PurpleDuck(stage, assetManager, gameScreen, roundNum);
                duck2 = new RedDuck(stage, assetManager, gameScreen, roundNum);
            }
        } else if (roundNum > 10 && roundNum <= 19) {
            if (waveNum < 5) {
                duck1 = new PurpleDuck(stage, assetManager, gameScreen, roundNum);
                duck2 = new RedDuck(stage, assetManager, gameScreen, roundNum);
            } else {
                duck1 = new RedDuck(stage, assetManager, gameScreen, roundNum);
                duck2 = new RedDuck(stage, assetManager, gameScreen, roundNum);
            }
        } else if (roundNum >= 20) {
            if (waveNum < 5) {
                duck1 = new PurpleDuck(stage, assetManager, gameScreen, roundNum);
                duck2 = new PurpleDuck(stage, assetManager, gameScreen, roundNum);
            } else {
                duck1 = new PurpleDuck(stage, assetManager, gameScreen, roundNum);
                duck2 = new RedDuck(stage, assetManager, gameScreen, roundNum);
            }
        }
        
        
        stage.on("waveEnd", onWaveEnd);
        stage.on("duckOffStage", onDuckGone);
        stage.on("laughDone", onLaughDone);
        stage.on("ammoGone", onAmmoGone);
        stage.on("ducksGone", onAmmoGone);
        
        duck1.enterStage();
        duck1.startMe();
        duck2.enterStage();
        duck2.startMe();


        // Adding ammo to array.
        if (shots.length < 2) {
            shots.push(new Shot(stage, assetManager, 100,540));
            shots.push(new Shot(stage, assetManager, 140,540));
            shots.push(new Shot(stage, assetManager, 180,540));
        }
        gameScreen.addGUI(shots, waves);
        gamePhase = 3;
    }

    function roundStart() {
        stage.on("roundEnd", onRoundEnd);
        stage.on("dogLand", onDogLand);
        stage.on("dogGone", onWaveStart);
        dog.jump(-100,340,-10,10);
        gamePhase = 2;
    }

    function gameOver() {
        gameScreen.gameOver();
        if(duck1) stage.removeChild(duck1);
        if(duck2) stage.removeChild(duck2);
        stage.removeChild(dog);
        setTimeout(() => {
            location.reload();
        }, 2500);
    }

    // --------------------------------------------------------------- EVENT HANDLERS

    function onRoundEnd(e) {
        if(duck1) duck1.remove();
        if(duck2) duck2.remove();
        if (hits >= 20) {
            if (roundNum >= 1 && roundNum <= 10) {
                perfect = 10000;
            } else if (roundNum >= 11 && roundNum <= 15) {
                perfect = 15000;
            } else if (roundNum >= 16 && roundNum <= 20) {
                perfect = 20000;
            }  else if (roundNum >= 21) {
                perfect = 30000;
            }
            console.log("Perfect score!" + perfect);
            gameScreen.updateScore(perfect);
        }
        if (roundNum <= 10 && hits < 6) {
            gameOver();
        } else if (roundNum > 10 && roundNum < 13 && hits < 7) {
            gameOver();
        } else if (roundNum > 12 && roundNum < 15 && hits < 8) {
            gameOver();
        } else if (roundNum > 14 && roundNum < 20 && hits < 9) {
            gameOver();
        } else if (roundNum > 19 && hits < 10) {
            gameOver();
        } else {
            roundNum++;
            ducksHit = 0;
            duckCount = 0;
            waveNum = 0;
            hits = 0;
            waves.forEach(wave => {
                wave.reset();
            });
            reset();
        }
        e.remove();
    }

    function onDuckGone(e) {
        if (duckCount == 1) {
            stage.dispatchEvent(eventDucksGone);
        } else if (duckCount > 1) {
            duckCount--;
        }
    }

    function onDuckKill(e) {
        hits++;
        ducksHit++;
        duckCount--;
        if (duckCount == 0) {
            stage.dispatchEvent(eventDucksGone);
        }
    }

    function onAmmoGone(e) {
        if (gamePhase == 3 && waveNum <= 9) {
            e.remove();
            if (ducksHit <= 1) {
                if (ducksHit == 0) {
                    gamePhase = 4;
                    dog.enterLaugh();
                    duck1.remove();
                    duck2.remove();
                } else if (ducksHit == 1 && duckCount > 0) {
                    if (duck1) duck1.flyAway();
                    if (duck2) duck2.flyAway();
                    dog.duckHit(1);
                }
                waves[waveNum].badWave();
            } else if(duckCount == 0 && ducksHit == 2) {
                waves[waveNum].goodWave();
                dog.duckHit(2);
            }
            stage.dispatchEvent(eventWaveEnd);

        }
        
    }

    function onLaughDone(e) {
        stage.removeChild(dog);
        if(duck1) duck1.remove();
        if(duck2) duck2.remove();
        reset();
        e.remove();
    }

    function onWaveStart(e) {
        console.log("wave start");
        console.log(waveNum);
        gamePhase = 4;
        if (waveNum <= 1) reset();
        e.remove();
    }

    function onWaveEnd(e) {
        console.log("Wave end");
        stage.removeChild(dog);
        gamePhase = 4;
        if (waveNum >= 9) {
            stage.dispatchEvent(eventRoundEnd);
            console.log("ROUND " + roundNum);
        }
        waveNum++;
        e.remove();
    }

    function onDogLand(e) {
        gamePhase = 3;
        e.remove();
    }

    function onTick(e) {
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        titleScreen.updateMe();
        if (duck1) duck1.update();
        if (duck2) duck2.update();
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
