class PurpleDuck extends Duck {

    constructor(stage, assetManager, gameScreen, round) {
        super(stage, assetManager, gameScreen);


        super._speed = 10;
        super.rightDiag = "blueFlyUpRightDiag";
        super.leftDiag = "blueFlyLeftDiag";
        super.right = "blueFlyRight";
        super.left = "blueFlyLeft";
        super.up = "blueFlyUp";
        super.shot = "blueShot";
        super.fall = "blueFall";

        if (round <= 5) {
            super.score = 1000;
        } else if (round > 5 && round <= 10) {
            super.score = 1600;
        } else {
            super.score = 3000;
        }
    }

}