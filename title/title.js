const fs = require("fs");
function isExistFile(file) {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
}

enchant(); //enchant.jsを使い始めるためのおまじない
window.onload = function() {
    game = new Core(800, 600);
    game.fps = 20
    //画像の読み込み
    //game.preload("adaman_title.png", "startButton.png");
    game.preload("fig/adaman_title.png", "fig/tri.png", "fig/single_battle.png", "fig/connection_battle.png");

    let arrow_available = true;
    let interval_count = 0;
    game.onload = function() { //準備が整ったら
      game.keybind(32, 'space');

        // 背景
        let background = new Sprite(800, 600);
        background.x = 0;
        background.y = 0;
        background.image = game.assets["fig/adaman_title.png"];
        game.rootScene.addChild(background)

        // シングル対戦
        let single_battle = new Sprite(237, 40);
        single_battle.x = 250;
        single_battle.y = 450;
        single_battle.image = game.assets["fig/single_battle.png"];
        game.rootScene.addChild(single_battle);

        // 通信対戦
        let connection_battle = new Sprite(170, 40);
        connection_battle.x = 270;
        connection_battle.y = 500;
        connection_battle.image = game.assets["fig/connection_battle.png"];
        game.rootScene.addChild(connection_battle);

        // 矢印
        let arrow = new Sprite(40, 40);
        arrow.x = 200;
        arrow.y = 450;
        arrow.image = game.assets["fig/tri.png"]
        arrow.on('enterframe', function(){
          if(arrow_available == true){
            if (game.input.up){
              if(this.y == 500)this.y -= 50;
              arrow_available = false;
            }
            if (game.input.down){
              if(this.y == 450)this.y += 50;
              arrow_available = false;
            }
            if (game.input.space) {
              // シングル対戦
              if(this.y == 450)location.href = "../battle/battle.html";
              // 通信対戦
              if(this.y == 500){
                if(isExistFile("../register/user_info.csv") == false)location.href = "../register/register.html"; // ユーザ名ファイルが存在しない
                else location.href = "../matching/matching.html"; // ユーザ名ファイルがある
              }
            }
          }
          else{ // arrow_available is false
            interval_count += 1;
            if(interval_count >= 3){
              arrow_available = true;
              interval_count = 0;
              console.log("arrow_available")
            }
          }
          if(game.input.right) console.log("arrow pos: " + arrow.x + ", " + arrow.y);
        });
        game.rootScene.addChild(arrow)
    }
    game.start(); //ゲーム開始
}
