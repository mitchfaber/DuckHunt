class Duck {

    constructor(stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        this._sprite = this._assetManager.getSprite("spritesheet");
        // this._sprite.mover = new MoverDiagonal(this._sprite, this._stage);

        // variables for movement
        this._moving = false;
        this._xDisplace = -1;
        this._yDisplace = -1;
    }

    _radianMe(degrees) {
        return (degrees * (Math.PI / 180));
    }  

    enterStage(myX, myY) {
        console.log("duck enter");
        this._sprite.x = myX;
        this._sprite.y = myY;
        this._stage.addChild(this._sprite);
    }

    remove() {
        this._stage.removeChild(this._sprite);
    }

    startMe(direction) {
        this._sprite.play();
        console.log("duck start");
        console.log(direction);
        // convert current rotation of object to radians
        let radians = this._radianMe(direction);
        // calculating X and Y displacement
        this._xDisplace = Math.cos(radians) * this._speed;
        this._yDisplace = Math.sin(radians) * this._speed;
    }

    update() {
        // move sprite
        this._sprite.x = this._sprite.x + this._xDisplace;
        this._sprite.y = this._sprite.y + this._yDisplace;

        // get dimenstions of current frame in sprite
        let dimensions = this._sprite.getBounds();
        let width = dimensions.width;
        let height = dimensions.height;

        // check if object is off the stage
        if ((this._sprite.x < -width) || (this._sprite.x > (this._stage.canvas.width + width)) || (this._sprite.y < -height) || (this._sprite.y > (this._stage.canvas.height + height))) {
            this._sprite.dispatchEvent(this._eventOffStage);
        }
    }

}