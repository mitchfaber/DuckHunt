class TitleScreen {

    constructor (stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        let background = new createjs.Shape();
        background.graphics.beginFill("#000000").drawRect(0, 0, 1200, 650);
        background.cache(0,0,1200,650);
        this._eventStartGame = new createjs.Event("startGame", true);
        this._stage.addChildAt(background,0);

        this.duck = this._assetManager.getSprite("spritesheet");
        this.duck.gotoAndPlay("duck");
        this.duck.x = -135;
        this.duck.y = 150;
        this._stage.addChildAt(this.duck,1);
        this.duck.mover = new Mover(this.duck, this._stage);
        this.duck.mover.speed = 15;
        this.duck.mover.direction = Mover.RIGHT;
        this.duck.mover.startMe();

        this.hunt = this._assetManager.getSprite("spritesheet");
        this.hunt.gotoAndPlay("hunt");
        this.hunt.x = 1345;
        this.hunt.y = 250;
        this._stage.addChildAt(this.hunt,2);
        this.hunt.mover = new Mover(this.hunt, this._stage);
        this.hunt.mover.speed = 15;
        this.hunt.mover.direction = Mover.LEFT;
        this.hunt.mover.startMe();

        this.bar = this._assetManager.getSprite("spritesheet");
        this.bar.gotoAndPlay("bar");
        this.bar.x = 600;
        this.bar.y = 200;
        this._stage.addChildAt(this.bar,3);
        
    }
    updateMe() {
        if (this.duck.x <= 550) {
            this.duck.mover.update();
        } else if (this.hunt.x >= 650) {
            this.hunt.mover.update();
        } else {
            // put this in here so you can't start the game until the title screen is ready!
            this._stage.on("click", () => this._stage.dispatchEvent(this._eventStartGame));
        }
    }
}