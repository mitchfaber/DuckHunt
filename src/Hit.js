class Hit {
    constructor(stage, assetmanager, myX,myY) {
        this._stage = stage;
        this._assetManager = assetmanager;
        this._sprite = this.assetManager("spritesheet").gotoAndStop("notHit");
        this._sprite.x = myX;
        this._sprite.y = myY;
    }

    add() {
        
    }

    goodWave() {

    }

    badWave() {

    }
}