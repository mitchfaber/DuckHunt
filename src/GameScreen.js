class GameScreen {
    
    constructor(stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        let background = new createjs.Shape();
        background.graphics.beginFill("#7ec0ee").drawRect(0, 0, 1200, 650);
        background.cache(0,0,1200,650);
        // this._stage.setClearColor("#7ec0ee");
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
        this._duckHit = this._assetManager.getSprite("spritesheet");
        this._duckHit.gotoAndStop("duckHit");
        this._duckHit.x = 150;
        this._duckHit.y = 550;
        this._noHit = this._assetManager.getSprite("spritesheet");
        this._noHit.gotoAndStop("notHit");
        this._noHit.x = 150;
        this._noHit.y = 550;
        this._round = this._assetManager.getSprite("spritesheet");
        this._round.gotoAndStop("round");
        this._round.x = 600;
        this._round.y = 850;
        this._roundNum = new createjs.BitmapText("1", this._assetManager.getSpriteSheet("spritesheet"));
        this._roundNum.x = 655;
        this._roundNum.y = 450;
        this._stage.addChildAt(this._ground, 1);
        this._stage.addChildAt(this._grass, 2);
        this._stage.addChildAt(this._tree, 3);
        this._stage.addChildAt(this._round, 4);
        // this._stage.addChildAt(this._roundNum, 5);
        this._round.mover = new Mover(this._round,this._stage);
        // this._roundNum.mover = new Mover(this._roundNum,this._stage);
        this._eventStart = new createjs.Event("start", true);
        this._eventShot = new createjs.Event("shotFired", true);
        
        background.on("click", (e) =>background.dispatchEvent(this._eventShot));
        this._ground.on("click", (e) =>background.dispatchEvent(this._eventShot));
        this._grass.on("click", (e) =>background.dispatchEvent(this._eventShot));
        this._tree.on("click", (e) =>background.dispatchEvent(this._eventShot));
        
    }

    roundStart() {
        if (this._round.y >= -60){
            this._round.mover.speed = 6;
            this._round.mover.direction = Mover.UP;
            this._round.mover.startMe();
            // this._roundNum.mover.speed = 6;
            // this._roundNum.mover.direction = Mover.UP;
            // this._roundNum.mover.startMe();
        } else if (this._round.y <= -60) {
            this._round.mover.speed = 0;
            this._round.dispatchEvent(this._eventStart);
        }
        this._round.mover.update();
    }

    flyAway() {
        this._stage.setClearColor("#ffffff");
    }

    addGUI(shots) {
        this._stage.addChildAt(this._scoreTracker, 5);
        this._stage.addChildAt(this._txtScore, 6);
        this._stage.addChildAt(this._hitTracker, 7);
        this._stage.addChildAt(this._shotTracker, 8);
        let index = 9;
        for (let i=0;i<shots.length; i++) {
            shots[i].add(index); 
            index++;
        }
        this._stage.addChildAt(this._duckHit, 12);
        this._stage.addChildAt(this._noHit, 13);
    }

    updateGUI(score="100", hit="missed") {
        this._newScore += parseInt(score);
        console.log(String(this._newScore));
        this._txtScore.text = String(this._newScore);
    }
}