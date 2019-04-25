class Duck {

    constructor(stage, assetManager, gameScreen) {
        this._stage = stage;
        this._gameScreen = gameScreen;
        this._assetManager = assetManager;
        this._sprite = this._assetManager.getSprite("spritesheet");
        this._eventOffStage = new createjs.Event("duckOffStage", true);
        this._eventDie = new createjs.Event("duckDie", true);
        this._eventShot = new createjs.Event("shotFired", true);
        // variables for movement
        this._speed = 6;
        this._moving = false;
        this._xDisplace = -1;
        this._yDisplace = -1;
        this._flyAway = false;
        this._shot = false;
        this._direction = this._randomMe(-180,0);
        console.log(this._direction);

        // these variables change depending on direction of duck - and are different for each color
        this.rightDiag = "greenFlyRightDiag";
        this.leftDiag = "greenFlyLeftDiag";
        this.right = "greenFlyRight";
        this.left = "greenFlyLeft";
        this.up = "greenFlyUp";
        this.shot = "greenShot";
        this.fall = "greenFall";

        this.score = 0;

        this._sprite.on("click", (e) => {
            this._shot = true;
            this.stopMe();
            this._sprite.gotoAndStop(this.shot);
            this._gameScreen.updateScore(this.score);
            setTimeout(() => {
                this._stage.setChildIndex(this._sprite, 1);
                this._sprite.gotoAndStop(this.fall);
                this._direction = 100;
                this.startMe();
            }, 500);
            this._sprite.dispatchEvent(this._eventShot);
            this._sprite.dispatchEvent(this._eventDie);
            
            e.remove();
        });
    }

    _randomMe(min,max) {
        // Generates number between(and including) min and max
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    _radianMe(degrees) {
        return (degrees * (Math.PI / 180));
    }  

    enterStage() {
        this._flyAway = false;
        console.log("duck enter");
        this._sprite.x = this._randomMe(0,600);
        this._sprite.y = 450;
        this._stage.addChildAt(this._sprite, this._stage.numChildren);
    }

    flyAway() {
        if (!this._shot) {
            this._flyAway = true;
            this._sprite.stop();
            let radians = this._radianMe(-100);
            // calculating X and Y displacement
            this._xDisplace = Math.cos(radians) * this._speed;
            this._yDisplace = Math.sin(radians) * this._speed;
            this._sprite.play();
        }
        
    }

    remove() {
        this._stage.removeChild(this._sprite);
    }

    startMe() {
        if (!this._moving) {
            // UP is -100
            // RIGHT is 0
            // DOWN is 100
            // LEFT is -180
            if (!this._shot && (this._direction > -90 && this._direction < -10 || this._direction < 90 && this._direction > 10)) {
                this._sprite.gotoAndStop(this.rightDiag);
            } else if (!this._shot && (this._direction >= -110 && this._direction <= -90 || this._direction <= 110 && this._direction >= 90)) {
                this._sprite.gotoAndStop(this.up);
            } else if (!this._shot && (this._direction > -180 && this._direction < -110 || this._direction < 180 && this._direction > 110)) {
                this._sprite.gotoAndStop(this.leftDiag);
            } else if (!this._shot && this._direction >= -10) {
                this._sprite.gotoAndStop(this.right);
            } else if (!this._shot && this._direction >= -180) {
                this._sprite.gotoAndStop(this.left);
            }


            let radians = this._radianMe(this._direction);
            // calculating X and Y displacement
            this._xDisplace = Math.cos(radians) * this._speed;
            this._yDisplace = Math.sin(radians) * this._speed;
            this._sprite.play();
            this._moving = true;
        }
    }

    stopMe() {
        if (this._moving) {
            this._sprite.stop();
            this._moving = false;
        }
    }
    

    update() {
        if (this._moving) {
            if (!this._shot) {
                if (this._sprite.x <= 100) {
                    this.stopMe();
                    this._direction = this._randomMe(-100,0);
                    this.startMe();
                } else if (this._sprite.x >= 1100) {
                    this.stopMe();
                    this._direction = this._randomMe(-100,-180);
                    this.startMe();
                } else if (this._sprite.y <= 50) {
                    this.stopMe();
                    if (this._sprite.x <= 500) {
                        this._direction = this._randomMe(-180,100);
                    } else {
                        this._direction = this._randomMe(0,100);
                    }
                    this.startMe();
                } else if (this._sprite.y >= 500) {
                    this.stopMe();
                    if (this._sprite.x >= 600) {
                        this._direction = this._randomMe(-180,-100);
                    } else {
                        this._direction = this._randomMe(-100,100);
                    }
                    this.startMe();
                }
            }


            // move sprite
            this._sprite.x = this._sprite.x + this._xDisplace;
            this._sprite.y = this._sprite.y + this._yDisplace;
            

            // get dimenstions of current frame in sprite
            let dimensions = this._sprite.getBounds();
            let width = dimensions.width;
            let height = dimensions.height;

            // check if object is off the stage
            if (!this._flyAway) {
                if ((this._sprite.x < -width) || (this._sprite.x > (this._stage.canvas.width + width)) || (this._sprite.y < -height) || (this._sprite.y > (this._stage.canvas.height + height))) {
                    this._sprite.dispatchEvent(this._eventOffStage);
                    this._stage.removeChild(this._sprite);
                }
            }
        }
    }
}