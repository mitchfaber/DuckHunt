class GreenDuck {

    constructor(stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        this._sprite = this._assetManager.getSprite("spritesheet");
        
    }

    enterStage(myX, myY, myDirection) {
        this._sprite.x = myX;
        this._sprite.y = myY;
        this._stage.addChild(this._sprite);
        this._sprite.mover = new Mover(this._sprite, this._stage);
        this._sprite.mover.speed = 5;
        this._sprite.gotoAndPlay("greenFlyUp");
        this._sprite.mover.direction = Mover.UP;
        this._sprite.mover.startMe();
        this.updateMe();
    }

    updateMe() {
        // console.log("duck update");
        this._sprite.mover.startMe();
        this._sprite.mover.update();
    }

}