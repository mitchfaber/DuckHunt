class Dog {

    constructor(stage, assetManager) {
        this._stage = stage;
        this._assetManager = assetManager;
        this.dog = this._assetManager.getSprite("spritesheet");
        this.dog.x = 600;
        this.dog.y = 500;
        this._stage.addChildAt(this.dog, 0);
        this.timer = 0;
    }

    laugh() {
        this.dog.mover = new Mover(this.dog, this._stage);
        this.dog.mover.speed = 5;
        this.dog.gotoAndPlay("laughing");
        this.dog.mover.startMe();
        
        
    }

    enterLaugh() {
        this.timer++;
        if (this.dog.y <= 300) {
            this.dog.mover.speed = 0;
        } else {
            this.dog.mover.direction = Mover.UP;
        }
        if (this.timer >= 120) {
            this.dog.mover.direction = Mover.DOWN;
            this.dog.mover.speed = 5;
            if (this.dog.y >= 500) {
                this._stage.removeChild(this.dog);
            }
        } 
        this.dog.mover.update();
    }
}