class GameScreen {
    
    constructor(stage, assetManager, gamePhase) {
        this._stage = stage;
        this._assetManager = assetManager;
        this._gamePhase = gamePhase;
        this.myRoundNum = "1";
        let background = new createjs.Shape();
        background.graphics.beginFill("#7ec0ee").drawRect(0, 0, 1200, 650);
        background.cache(0,0,1200,650);
        this._stage.addChildAt(background,0);
        this._newScore = 0;
        this._txtScore = new createjs.BitmapText("0", this._assetManager.getSpriteSheet("spritesheet"));
        this._txtScore.x = 960;
        this._txtScore.y = 535;
        this._txtScore.letterSpacing = -4;
        this._scoreTracker = this._assetManager.getSprite("spritesheet");
        this._scoreTracker.gotoAndStop("scoreTracker");
        this._scoreTracker.x = 1050;
        this._scoreTracker.y = 550;
        this._ground = this._assetManager.getSprite("spritesheet");
        this._ground.gotoAndStop("ground");
        this._ground.x = 600;
        this._ground.y = 600;
        this._grass = this._assetManager.getSprite("spritesheet");
        this._grass.gotoAndStop("grass");
        this._grass.x = 600;
        this._grass.y = 460;
        this._tree = this._assetManager.getSprite("spritesheet");
        this._tree.gotoAndStop("tree");
        this._tree.x = 300;
        this._tree.y = 460;
        this._hitTracker = this._assetManager.getSprite("spritesheet");
        this._hitTracker.gotoAndStop("hitTracker");
        this._hitTracker.x = 600;
        this._hitTracker.y = 550;
        this._shotTracker = this._assetManager.getSprite("spritesheet");
        this._shotTracker.gotoAndStop("shotTracker");
        this._shotTracker.x = 150;
        this._shotTracker.y = 550;
        
        this._stage.addChildAt(this._ground, 1);
        this._stage.addChildAt(this._grass, 2);
        this._stage.addChildAt(this._tree, 3);

        this._eventShot = new createjs.Event("shotFired", true);
        this._eventGameOver = new createjs.Event("gameOver", true);
        this._stage.on("dogGone", (e) => {
            background.on("click", (e) =>background.dispatchEvent(this._eventShot));
            this._ground.on("click", (e) =>background.dispatchEvent(this._eventShot));
            this._grass.on("click", (e) =>background.dispatchEvent(this._eventShot));
            this._tree.on("click", (e) =>background.dispatchEvent(this._eventShot));
            e.remove();
        });
    }

    

    gameOver() {
        this._stage.removeAllChildren();
        console.log("GAME OVER");
        this._gameOver = this._assetManager.getSprite("spritesheet");
        this._gameOver.gotoAndStop("gameOver");
        this._gameOver.x = 600;
        this._gameOver.y = 300;
        this._scoreTracker = this._assetManager.getSprite("spritesheet");
        this._scoreTracker.gotoAndStop("scoreTracker");
        this._scoreTracker.x = 600;
        this._scoreTracker.y = 450;
        this._txtScore.x = 690;
        this._txtScore.y = 435;
        this._stage.addChild(this._scoreTracker);
        this._stage.addChild(this._txtScore);
        this._stage.addChild(this._gameOver);
    }

    addGUI(shots, waves) {
        if (this._stage.numChildren <= 10) {
            console.log("Adding GUI");
            this._stage.addChildAt(this._scoreTracker, 5);
            this._stage.addChildAt(this._txtScore, 6);
            this._stage.addChildAt(this._hitTracker, 7);
            this._stage.addChildAt(this._shotTracker, 8);
        }
        this._reset(shots,waves);
    }

    updateScore(score) {
        console.log(score);
        this._newScore += parseInt(score);
        // console.log(String(this._newScore));
        this._txtScore.text = String(this._newScore);
    }

    // ------------------------------------------------------ PRIVATE FUNCTIONS
    _reset(shots, waves) {
        let index = this._stage.numChildren;
        for (let i=0;i<shots.length; i++) {
            shots[i].add(index);
        }
        for (let i=0;i<waves.length; i++) {
            waves[i].add(13);
        }
    }
}