class Dog {

    constructor(stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._sprite.x = 600;
        this._sprite.y = 500;
        this.timer = 0;
        this._gamePhase = 1;
    }

    laugh() {
        this._sprite.mover = new Mover(this._sprite, this._stage);
        this._sprite.mover.speed = 5;
        this._sprite.gotoAndPlay("laughing");
        this._sprite.mover.startMe();
    }

    enterLaugh() {
        this.timer++;
        if (this._sprite.y <= 300) {
            this._sprite.mover.speed = 0;
        } else {
            this._sprite.mover.direction = Mover.UP;
        }
        if (this.timer >= 120) {
            this._sprite.mover.direction = Mover.DOWN;
            this._sprite.mover.speed = 5;
            if (this._sprite.y >= 500) {
                this._stage.removeChild(this._sprite);
            }
        } 
        this._sprite.mover.update();
    }

    roundStart() {
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._sprite.gotoAndStop("dogJump");
        this._sprite.x = 50;
        this._sprite.y = 430;
        this._stage.addChild(this._sprite);
        this._sprite.mover = new MoverDiagonal(this._sprite,this._stage);
        this._sprite.mover.speed = 5;
        this._sprite.rotation = -10;
        this._sprite.mover.startMe();
    }

    setupMe() {
        if (this._gamePhase == 1) {
            this.roundStart();
        }
    }

    updateMe() {
        if (this._gamePhase == 1 && this._sprite.y <= 440 && this._sprite.y >= 400) {
            this._sprite.mover.update();
        } else if (this._sprite.y <= 400) {
            this._sprite.mover.stopMe();
            this._sprite.rotation = 10;
            this._sprite.mover.startMe();
            this._sprite.mover.update();
        } else if (this._gamePhase == 1 && this._sprite.y >= 440) {
            this._sprite.gotoAndStop("dogFound");
            this._sprite.rotation = 0;
        }
        
    }
}