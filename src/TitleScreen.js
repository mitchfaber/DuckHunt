class TitleScreen {

    constructor (stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        this.duck = this._assetManager.getSprite("spritesheet");
        this.duck.gotoAndStop("duck");
        this.duck.x = -30;
        this.dog.y = 800;
        this._stage.addChild(this.duck);
    }
}