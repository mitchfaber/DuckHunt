class GameScreen {
    
    constructor(stage, assetManager) {
        this._stage = stage;
        this._txtScore = new createjs.BitmapText("000000", assetManager.getSpriteSheet("spritesheet"));
        this._txtScore.x = 960;
        this._txtScore.y = 535;
        this._txtScore.letterSpacing = -4;
        this._scoreTracker = assetManager.getSprite("spritesheet");
        this._scoreTracker.gotoAndStop("scoreTracker");
        this._scoreTracker.x = 1050;
        this._scoreTracker.y = 550;
        this._ground = assetManager.getSprite("spritesheet");
        this._ground.gotoAndStop("ground");
        this._ground.x = 600;
        this._ground.y = 600;
        this._grass = assetManager.getSprite("spritesheet");
        this._grass.gotoAndStop("grass");
        this._grass.x = 600;
        this._grass.y = 460;
        this._tree = assetManager.getSprite("spritesheet");
        this._tree.gotoAndStop("tree");
        this._tree.x = 300;
        this._tree.y = 460;
        this._stage.addChildAt(this._ground, 0);
        this._stage.addChildAt(this._grass, 1);
        this._stage.addChildAt(this._tree, 2);
        this._stage.addChildAt(this._scoreTracker, 3);
        this._stage.addChildAt(this._txtScore, 4);
    }
}