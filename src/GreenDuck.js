class GreenDuck extends Duck{

    constructor(stage, assetManager, round, rotation) {
        super(stage, assetManager);
        // this._sprite.mover.speed = 6;
        Math.random();
        // this._sprite.rotation = -80;
        this._sprite.gotoAndStop("greenFlyRightDiag");
        super.startMe();
        super.update();
        this._eventDie = new createjs.Event("duckDie", true);

        if (round <= 5) {
            this.score = 500;
        } else if (round > 5 && round <= 10) {
            this.score = 800;
        } else {
            this.score = 1000;
        }
        
        this._sprite.on("click", (e) => {
            this._sprite.gotoAndStop("greenShot");
            // this._sprite.mover.stopMe();
            setTimeout(() => {
                this._sprite.gotoAndStop("greenFall");
                this._sprite.rotation = 100;
                // this._sprite.mover.speed = 10;
                // this._sprite.mover.startMe();
            }, 500);
            this._sprite.dispatchEvent(this._eventDie);
            e.remove();
        });
    }
    

    updateMe() {
        super.update();
    }
}