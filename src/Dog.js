class Dog {

    constructor(stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        this._sprite = this._assetManager.getSprite("spritesheet");
        this.timer = 0;
        this._gamePhase = 1;
        this._dogDone = new createjs.Event("dogGone", true);
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

    jump(myX, myY, myRotate, mySpeed) {
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._sprite.gotoAndStop("dogJump");
        // console.log(myX);
        this._sprite.x = myX;
        this._sprite.y = myY;
        this._stage.addChild(this._sprite);
        this._sprite.mover = new MoverDiagonal(this._sprite,this._stage);
        this._sprite.mover.speed = mySpeed;
        this._sprite.rotation = myRotate;
        this._sprite.mover.startMe();
    }


    updateMe() {
        // if we are in the "round start" phase for the dog, do this...
        if (this._gamePhase == 1 && this._sprite.y <= 440 && this._sprite.y >= 400) {
            this._sprite.mover.update();
        } else if (this._gamePhase == 1 && this._sprite.y <= 400) {
            this._sprite.mover.stopMe();
            this._sprite.rotation = 10;
            this._sprite.mover.startMe();
            this._sprite.mover.update();
        } else if (this._gamePhase == 1 && this._sprite.y >= 440) {
            this._sprite.gotoAndStop("dogFound");
            this._sprite.rotation = 0;
            this._gamePhase = 2;
            this._sprite.mover.stopMe();
        }

        // after the dog lands, change gamephase to 2, and do this...
        if (this._gamePhase == 2) {
            let flag;
            this._sprite.gotoAndStop("dogJump");
            this._sprite.rotation = -30;
            this._sprite.mover.startMe();
            this._sprite.mover.update();
            if (this._sprite.y <= 360) {
                this._sprite.mover.stopMe();
                console.log("go down!");
                this._sprite.rotation = 50;
                this._sprite.mover.startMe();
                // trying to set dog to be behind grass, so he jumps over it....
                this._stage.setChildIndex( this._sprite, 0);
            } else if (this._sprite.y >= 500) {
                this._sprite.dispatchEvent(this._dogDone);
                this._stage.removeChild(this._sprite);
            }
        }

        // this block of code is for the round ending if they got every duck...

        //this block is for the round ending if they missed a duck...
    }
}