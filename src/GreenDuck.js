class GreenDuck extends Duck{

    constructor(stage, assetManager, gameScreen, round) {
        super(stage, assetManager, gameScreen);

        super._speed = 8;
        this.rightDiag = "greenFlyRightDiag";
        this.leftDiag = "greenFlyLeftDiag";
        this.right = "greenFlyRight";
        this.left = "greenFlyLeft";
        this.up = "greenFlyUp";
        this.shot = "greenShot";
        this.fall = "greenFall";

        if (round <= 5) {
            super.score = 500;
        } else if (round > 5 && round <= 10) {
            super.score = 800;
        } else {
            super.score = 1000;
        }
    }
}