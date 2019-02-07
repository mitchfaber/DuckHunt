(function(window) {
spritesheet = function() {
	this.initialize();
}
spritesheet._SpriteSheet = new createjs.SpriteSheet({images: ["spritesheet.png"], frames: [[0,0,176,212,0,95,18],[0,0,176,212,0,95,18],[0,0,176,212,0,95,18],[0,0,176,212,0,95,18],[176,0,212,281,0,110,40],[176,0,212,281,0,110,40],[176,0,212,281,0,110,40],[176,0,212,281,0,110,40],[176,0,212,281,0,110,40],[388,0,210,275,0,112,35],[598,0,149,144,0,67,0],[598,0,149,144,0,67,0],[598,0,149,144,0,67,0],[598,0,149,144,0,67,0],[747,0,110,131,0,53,0],[747,0,110,131,0,53,0],[747,0,110,131,0,53,0],[747,0,110,131,0,53,0],[598,0,149,144,0,68,0],[857,0,146,113,0,83,0],[857,0,146,113,0,83,0],[857,0,146,113,0,83,0],[857,0,146,113,0,83,0],[1003,0,175,137,0,95,0],[1003,0,175,137,0,95,0],[1003,0,175,137,0,95,0],[1003,0,175,137,0,95,0],[857,0,146,113,0,83,0],[1178,0,188,80,0,128,-2],[1178,0,188,80,0,128,-2],[1178,0,188,80,0,128,-2],[1178,0,188,80,0,128,-2],[1366,0,178,80,0,116,21],[1366,0,178,80,0,116,21],[1366,0,178,80,0,116,21],[1366,0,178,80,0,116,21],[1178,0,188,80,0,127,0],[1544,0,146,114,0,18,-3],[1544,0,146,114,0,18,-3],[1544,0,146,114,0,18,-3],[1544,0,146,114,0,18,-3],[1690,0,175,138,0,25,-1],[1690,0,175,138,0,25,-1],[1690,0,175,138,0,25,-1],[1690,0,175,138,0,25,-1],[1544,0,146,114,0,18,-3],[0,281,188,79,0,15,-4],[0,281,188,79,0,15,-4],[0,281,188,79,0,15,-4],[0,281,188,79,0,15,-4],[188,281,177,80,0,22,20],[188,281,177,80,0,22,20],[188,281,177,80,0,22,20],[188,281,177,80,0,22,20],[0,281,188,79,0,15,-3],[365,281,130,123,0,63,7],[495,281,90,128,0,23,0],[585,281,241,174,0,27,15],[826,281,160,168,0,58,42],[826,281,160,168,0,58,42],[826,281,160,168,0,58,42],[826,281,160,168,0,58,42],[826,281,160,168,0,58,42],[826,281,160,168,0,58,42],[986,281,191,139,0,78,15],[986,281,191,139,0,78,15],[986,281,191,139,0,78,15],[986,281,191,139,0,78,15],[986,281,191,139,0,78,15],[1177,281,150,144,0,61,8],[1177,281,150,144,0,61,8],[1177,281,150,144,0,61,8],[1177,281,150,144,0,61,8],[1327,281,111,131,0,39,9],[1327,281,111,131,0,39,9],[1327,281,111,131,0,39,9],[1327,281,111,131,0,39,9],[1177,281,150,144,0,61,8],[1438,281,146,114,0,83,-1],[1438,281,146,114,0,83,-1],[1438,281,146,114,0,83,-1],[1438,281,146,114,0,83,-1],[1584,281,175,137,0,95,0],[1584,281,175,137,0,95,0],[1584,281,175,137,0,95,0],[1584,281,175,137,0,95,0],[1438,281,146,114,0,83,0],[1759,281,188,79,0,128,0],[1759,281,188,79,0,128,0],[1759,281,188,79,0,128,0],[1759,281,188,79,0,128,0],[0,455,178,80,0,116,18],[0,455,178,80,0,116,18],[0,455,178,80,0,116,18],[0,455,178,80,0,116,18],[1759,281,188,79,0,127,0],[178,455,147,113,0,20,0],[178,455,147,113,0,20,0],[178,455,147,113,0,20,0],[178,455,147,113,0,20,0],[325,455,175,137,0,25,0],[325,455,175,137,0,25,0],[325,455,175,137,0,25,0],[325,455,175,137,0,25,0],[178,455,147,113,0,19,0],[500,455,189,79,0,0,0],[500,455,189,79,0,0,0],[500,455,189,79,0,0,0],[500,455,189,79,0,0,0],[689,455,178,81,0,9,22],[689,455,178,81,0,9,22],[689,455,178,81,0,9,22],[689,455,178,81,0,9,22],[500,455,189,79,0,15,0],[867,455,131,123,0,60,12],[998,455,90,128,0,19,0],[1088,455,150,143,0,61,4],[1088,455,150,143,0,61,4],[1088,455,150,143,0,61,4],[1088,455,150,143,0,61,4],[1238,455,111,131,0,39,7],[1238,455,111,131,0,39,7],[1238,455,111,131,0,39,7],[1238,455,111,131,0,39,7],[1088,455,150,143,0,61,4],[1349,455,146,113,0,83,0],[1349,455,146,113,0,83,0],[1349,455,146,113,0,83,0],[1349,455,146,113,0,83,0],[1495,455,175,137,0,95,0],[1495,455,175,137,0,95,0],[1495,455,175,137,0,95,0],[1495,455,175,137,0,95,0],[1349,455,146,113,0,83,0],[1670,455,188,79,0,128,0],[1670,455,188,79,0,128,0],[1670,455,188,79,0,128,0],[1670,455,188,79,0,128,0],[1858,455,178,80,0,116,24],[1858,455,178,80,0,116,24],[1858,455,178,80,0,116,24],[1858,455,178,80,0,116,24],[1670,455,188,79,0,128,0],[0,598,146,113,0,64,0],[0,598,146,113,0,64,0],[0,598,146,113,0,64,0],[0,598,146,113,0,64,0],[146,598,176,137,0,81,0],[146,598,176,137,0,81,0],[146,598,176,137,0,81,0],[146,598,176,137,0,81,0],[0,598,146,113,0,64,0],[322,598,188,79,0,61,0],[322,598,188,79,0,61,0],[322,598,188,79,0,61,0],[322,598,188,79,0,61,0],[510,598,177,80,0,62,24],[510,598,177,80,0,62,24],[510,598,177,80,0,62,24],[510,598,177,80,0,62,24],[322,598,188,79,0,61,0],[687,598,131,123,0,65,11],[818,598,91,128,0,18,0],[909,598,305,75,0,152,37],[1214,598,289,67,0,144,34],[1503,598,371,9,0,184,5],[1874,598,149,59,0,74,30],[0,735,29,61,0,14,26],[29,735,387,63,0,194,31],[416,735,49,49,0,23,26],[465,735,49,49,0,24,24],[514,735,491,191,0,246,94],[1005,735,81,133,0,33,65],[1086,735,68,137,0,25,69],[1154,735,63,127,0,25,67],[1217,735,73,147,0,28,77],[1290,735,82,139,0,40,77],[1372,735,78,159,0,30,81],[1450,735,75,151,0,28,75],[1525,735,68,135,0,25,63],[1593,735,77,155,0,24,73],[1670,735,73,147,0,44,67],[1743,735,233,235,0,107,74],[0,970,261,243,0,130,62],[261,970,261,117,0,131,54],[522,970,261,117,0,131,59],[0,1213,1280,769,0,617,331]],  animations: {laughing:[0,9, true], greenFlyUp:[10,18, true], greenFlyRightDiag:[19,27, true], greenFlyRight:[28,36, true], greenFlyLeftDiag:[37,45, true], greenFlyLeft:[46,54, true], greenShot:[55,55, true], greenFall:[56,56, true], dogFound:[57,57, true], dogJump:[58,68, true], blueFlyUp:[69,77, true], blueFlyUpRightDiag:[78,86, true], blueFlyRight:[87,95, true], blueFlyLeftDiag:[96,104, true], blueFlyLeft:[105,113, true], blueShot:[114,114, true], blueFall:[115,115, true], redFlyUp:[116,124, true], redFlyUpRightDiag:[125,133, true], redFlyRight:[134,142, true], redFlyLeftDiag:[143,151, true], redFlyLeft:[152,160, true], redShot:[161,161, true], redFall:[162,162, true], duck:[163,163, true], hunt:[164,164, true], bar:[165,165, true], shotTracker:[166,166, true], bullet:[167,167, true], hitTracker:[168,168, true], duckHit:[169,169, true], notHit:[170,170, true], scoreTracker:[171,171, true], 0:[172,172, true], 1:[173,173, true], 2:[174,174, true], 3:[175,175, true], 4:[176,176, true], 5:[177,177, true], 6:[178,178, true], 7:[179,179, true], 8:[180,180, true], 9:[181,181, true], dogHold1:[182,182, true], dogHold2:[183,183, true], gameOver:[184,184, true], round:[185,185, true], stage:[186,186, true]}});
var spritesheet_p = spritesheet.prototype = new createjs.Sprite();
spritesheet_p.Sprite_initialize = spritesheet_p.initialize;
spritesheet_p.initialize = function() {
	this.Sprite_initialize(spritesheet._SpriteSheet);
	this.paused = false;
}
spritesheet_p.laughing = function(){
	this.gotoAndPlay("laughing");
}
spritesheet_p.greenFlyUp = function(){
	this.gotoAndPlay("greenFlyUp");
}
spritesheet_p.greenFlyRightDiag = function(){
	this.gotoAndPlay("greenFlyRightDiag");
}
spritesheet_p.greenFlyRight = function(){
	this.gotoAndPlay("greenFlyRight");
}
spritesheet_p.greenFlyLeftDiag = function(){
	this.gotoAndPlay("greenFlyLeftDiag");
}
spritesheet_p.greenFlyLeft = function(){
	this.gotoAndPlay("greenFlyLeft");
}
spritesheet_p.greenShot = function(){
	this.gotoAndPlay("greenShot");
}
spritesheet_p.greenFall = function(){
	this.gotoAndPlay("greenFall");
}
spritesheet_p.dogFound = function(){
	this.gotoAndPlay("dogFound");
}
spritesheet_p.dogJump = function(){
	this.gotoAndPlay("dogJump");
}
spritesheet_p.blueFlyUp = function(){
	this.gotoAndPlay("blueFlyUp");
}
spritesheet_p.blueFlyUpRightDiag = function(){
	this.gotoAndPlay("blueFlyUpRightDiag");
}
spritesheet_p.blueFlyRight = function(){
	this.gotoAndPlay("blueFlyRight");
}
spritesheet_p.blueFlyLeftDiag = function(){
	this.gotoAndPlay("blueFlyLeftDiag");
}
spritesheet_p.blueFlyLeft = function(){
	this.gotoAndPlay("blueFlyLeft");
}
spritesheet_p.blueShot = function(){
	this.gotoAndPlay("blueShot");
}
spritesheet_p.blueFall = function(){
	this.gotoAndPlay("blueFall");
}
spritesheet_p.redFlyUp = function(){
	this.gotoAndPlay("redFlyUp");
}
spritesheet_p.redFlyUpRightDiag = function(){
	this.gotoAndPlay("redFlyUpRightDiag");
}
spritesheet_p.redFlyRight = function(){
	this.gotoAndPlay("redFlyRight");
}
spritesheet_p.redFlyLeftDiag = function(){
	this.gotoAndPlay("redFlyLeftDiag");
}
spritesheet_p.redFlyLeft = function(){
	this.gotoAndPlay("redFlyLeft");
}
spritesheet_p.redShot = function(){
	this.gotoAndPlay("redShot");
}
spritesheet_p.redFall = function(){
	this.gotoAndPlay("redFall");
}
spritesheet_p.duck = function(){
	this.gotoAndPlay("duck");
}
spritesheet_p.hunt = function(){
	this.gotoAndPlay("hunt");
}
spritesheet_p.bar = function(){
	this.gotoAndPlay("bar");
}
spritesheet_p.shotTracker = function(){
	this.gotoAndPlay("shotTracker");
}
spritesheet_p.bullet = function(){
	this.gotoAndPlay("bullet");
}
spritesheet_p.hitTracker = function(){
	this.gotoAndPlay("hitTracker");
}
spritesheet_p.duckHit = function(){
	this.gotoAndPlay("duckHit");
}
spritesheet_p.notHit = function(){
	this.gotoAndPlay("notHit");
}
spritesheet_p.scoreTracker = function(){
	this.gotoAndPlay("scoreTracker");
}
// spritesheet_p.0 = function(){
// 	this.gotoAndPlay("0");
// }
// spritesheet_p.1 = function(){
// 	this.gotoAndPlay("1");
// }
// spritesheet_p.2 = function(){
// 	this.gotoAndPlay("2");
// }
// spritesheet_p.3 = function(){
// 	this.gotoAndPlay("3");
// }
// spritesheet_p.4 = function(){
// 	this.gotoAndPlay("4");
// }
// spritesheet_p.5 = function(){
// 	this.gotoAndPlay("5");
// }
// spritesheet_p.6 = function(){
// 	this.gotoAndPlay("6");
// }
// spritesheet_p.7 = function(){
// 	this.gotoAndPlay("7");
// }
// spritesheet_p.8 = function(){
// 	this.gotoAndPlay("8");
// }
// spritesheet_p.9 = function(){
// 	this.gotoAndPlay("9");
// }
spritesheet_p.dogHold1 = function(){
	this.gotoAndPlay("dogHold1");
}
spritesheet_p.dogHold2 = function(){
	this.gotoAndPlay("dogHold2");
}
spritesheet_p.gameOver = function(){
	this.gotoAndPlay("gameOver");
}
spritesheet_p.round = function(){
	this.gotoAndPlay("round");
}
spritesheet_p.stage = function(){
	this.gotoAndPlay("stage");
}
window.spritesheet = spritesheet;
}(window));

