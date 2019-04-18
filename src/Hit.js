class Hit {
    constructor(stage, assetmanager, myX,myY) {
        this._stage = stage;
        this._assetManager = assetmanager;
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._sprite.gotoAndStop("notHit");
        this._sprite.x = myX;
        this._sprite.y = myY;
    }

    add(index) {
        this._stage.addChildAt(this._sprite, index);
    }

    goodWave() {
        
    }

    badWave() {
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._sprite.gotoAndStop("notHit");
    }

    flash() {
        this._sprite.gotoAndPlay("notHit");
    }
}