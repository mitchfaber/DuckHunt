class Dog {

    constructor(stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        this._sprite = this._assetManager.getSprite("spritesheet");
        this.timer = 0;
        this._gamePhase = 0;
        this._dogDone = new createjs.Event("dogGone", true);
        this._dogLand = new createjs.Event("dogLand", true);
        this._laughDone = new createjs.Event("laughDone", true);
    }

    enterLaugh() {
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._sprite.gotoAndPlay("laughing");
        this._sprite.y = 500;
        this._sprite.x = 600;
        this._stage.addChildAt(this._sprite,1);
        this._sprite.mover = new Mover(this._sprite, this._stage);
        this._sprite.mover.speed = 4;
        this._sprite.mover.direction = Mover.UP;
        this._sprite.mover.startMe();
    }

    duckHit(howMany) {
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._sprite.gotoAndStop("dogHold" + howMany);
        this._sprite.y = 500;
        this._sprite.x = 600;
        this._stage.addChildAt(this._sprite,1);
        this._sprite.mover = new Mover(this._sprite, this._stage);
        this._sprite.mover.speed = 4;
        this._sprite.mover.direction = Mover.UP;
        this._sprite.mover.startMe();
    }

    jump(myX, myY, myRotate, mySpeed) {
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._sprite.gotoAndStop("dogJump");
        this._sprite.x = myX;
        this._sprite.y = myY;
        this._stage.addChild(this._sprite);
        this._sprite.mover = new MoverDiagonal(this._sprite,this._stage);
        this._sprite.mover.speed = mySpeed;
        this._sprite.rotation = myRotate;
        this._sprite.mover.startMe();
    }


    updateMe(gamePhase) {
        // if we are in the "round start" phase for the dog, do this...
        if (gamePhase == 2 && this._sprite.y <= 440 && this._sprite.y >= 400) {
            this._sprite.mover.update();
        } else if (gamePhase == 2 && this._sprite.y <= 400) {
            this._sprite.mover.stopMe();
            this._sprite.rotation = 10;
            this._sprite.mover.startMe();
            this._sprite.mover.update();
        } else if (gamePhase == 2 && this._sprite.y >= 440) {
            this._sprite.gotoAndStop("dogFound");
            this._sprite.rotation = 0;
            
            this._sprite.mover.stopMe();
            setTimeout(() => {
                this._sprite.dispatchEvent(this._dogLand);
            }, 1000);
        }

        // after the dog lands, change gamephase to 3, and do this...
        if (gamePhase == 3) {
            this._sprite.gotoAndStop("dogJump");
            this._sprite.rotation = -30;
            this._sprite.mover.startMe();
            this._sprite.mover.update();
            if (this._sprite.y <= 360) {
                this._sprite.mover.stopMe();
                this._sprite.rotation = 50;
                this._sprite.mover.startMe();
                this._stage.setChildIndex( this._sprite, 1);
            } else if (this._sprite.y >= 500) {
                this._sprite.dispatchEvent(this._dogDone);
                this._stage.removeChild(this._sprite);
            }
        }

        if (gamePhase == 4) {
            if (this._sprite.y >= 300) {
                this._sprite.mover.update();
            } else if (this._sprite.y <= 300 && this._sprite.mover.direction == Mover.UP) {
                this._sprite.mover.direction = Mover.DOWN;
                this._sprite.mover.speed = 0;
                setTimeout(() => {
                    this._sprite.mover.speed = 4;
                    this._sprite.mover.update();
                }, 600);
            }
            if (this._sprite.y >= 500 && this._sprite.mover.direction == Mover.DOWN) {
                this._sprite.mover.stopMe();
                this._stage.removeChild(this._sprite);
                this._stage.dispatchEvent(this._laughDone);
            }
        }
    }
}