class RedDuck extends Duck {

    constructor(stage, assetManager, gameScreen, round) {
        super(stage, assetManager, gameScreen);

        super._speed = 12;
        this.rightDiag = "redFlyUpRightDiag";
        this.leftDiag = "redFlyLeftDiag";
        this.right = "redFlyRight";
        this.left = "redFlyLeft";
        this.up = "redFlyUp";
        this.shot = "redShot";
        this.fall = "redFall";

        if (round <= 5) {
            super.score = 1500;
        } else if (round > 5 && round <= 10) {
            super.score = 2400;
        } else {
            super.score = 3000;
        }
    }

}