class Shot {
    constructor(stage, assetmanager, myX, myY) {
        this._stage = stage;
        this._assetmanager = assetmanager;
        this._sprite = this._assetmanager.getSprite("spritesheet");
        this._sprite.gotoAndStop("bullet");
        this._sprite.x = myX;
        this._sprite.y = myY;
    }

    add(index) {
        this._stage.addChildAt(this._sprite, index);
    }

    update() {
        this._stage.removeChild(this._sprite);
    }
}