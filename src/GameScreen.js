class GameScreen {
    
    constructor(stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        this._dog = new Dog(this._stage,this._assetManager);
        this._stage.setClearColor("#7ec0ee");
        this._txtScore = new createjs.BitmapText("000000", this._assetManager.getSpriteSheet("spritesheet"));
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
        this._round = this._assetManager.getSprite("spritesheet");
        this._round.gotoAndStop("round");
        this._round.x = 600;
        this._round.y = 850;
        this._stage.addChildAt(this._ground, 0);
        this._stage.addChildAt(this._grass, 1);
        this._stage.addChildAt(this._tree, 2);
        this._stage.addChildAt(this._round, 3);
        // this._stage.addChildAt(this._scoreTracker, 3);
        // this._stage.addChildAt(this._txtScore, 4);
        // this._stage.addChildAt(this._hitTracker, 5);
        // this._stage.addChildAt(this._shotTracker, 6);
        this._eventStart = new createjs.Event("start");
    }

    roundStart() {
        // console.log("Round Starting!");
        // this._dog = new Dog(this._stage, this._assetManager);
        this._round.mover = new Mover(this._round,this._stage);
        if (this._round.y >= -60){
            this._round.mover.speed = 6;
            this._round.mover.direction = Mover.UP;
            this._round.mover.startMe();
        } else if (this._round.y <= -60) {
            this._round.mover.speed = 0;
            this._dog.roundStart();
        }
        this._round.mover.update();
        
    }
}