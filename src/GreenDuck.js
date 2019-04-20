class GreenDuck extends Duck{

    constructor(stage, assetManager, round) {
        super(stage, assetManager);
        // this._sprite.mover.speed = 6;
        Math.random();
        // this._sprite.rotation = -80;
        this._sprite.gotoAndStop("greenFlyRightDiag");
        this._eventDie = new createjs.Event("duckDie", true);
        this._eventShot = new createjs.Event("shotFired", true);

        if (round <= 5) {
            this.score = 500;
        } else if (round > 5 && round <= 10) {
            this.score = 800;
        } else {
            this.score = 1000;
        }
        
        this._sprite.on("click", (e) => {
            this._sprite.gotoAndStop("greenShot");
            setTimeout(() => {
                this._sprite.gotoAndStop("greenFall");
                super.startMe(-100);
                setTimeout(() => {
                    super.remove();
                }, 500);
            }, 500);
            this._sprite.dispatchEvent(this._eventShot);
            this._sprite.dispatchEvent(this._eventDie);
            
            e.remove();
        });
    }
}