enchant(); //enchant.jsを使い始めるためのおまじない
window.onload = function() {
    game = new Core(800, 600);
    game.fps = 30
    //画像の読み込み
    //game.preload("adaman_title.png", "startButton.png");
    game.preload("fig/side.png", "fig/chara3.png", "fig/icon1.png");

    game.onload = function() { //準備が整ったら
      game.keybind(32, 'space');
        var left_bar = new Sprite(100, 600);
        left_bar.x = 0;
        left_bar.y = 0;
        left_bar.image = game.assets["fig/side.png"];
        var right_bar = new Sprite(100, 600);
        right_bar.x = 700;
        right_bar.y = 0;
        right_bar.image = game.assets["fig/side.png"];

        game.rootScene.addChild(left_bar)
        game.rootScene.addChild(right_bar)

        var player = new Sprite(32, 32);
        player.x = 400;
        player.y = 550;
        player.image = game.assets["fig/chara3.png"];
        player.frame = 18;
        player.scale(1.5, 1.5);
        var interval_count = 0;
        var shot_available = true;
        player.on('enterframe', function(){
          if (game.input.left) this.x -= 5;
          if (game.input.right) this.x += 5;
          if (game.input.space){
            if(shot_available == true){
              var bullet = new Sprite(16, 16);
              bullet.x = player.x + 16 - 8;
              bullet.y = player.y;
              bullet.image = game.assets["fig/icon1.png"];
              bullet.frame = 2;
              game.rootScene.addChild(bullet)
              bullet.on('enterframe', function(){
                this.y -= 5;
              })
              shot_available = false;
            }
          }
          if(shot_available == false){
            interval_count += 1;
            if(interval_count >= 20){
              shot_available = true;
              interval_count = 0;
              console.log("shot available")
            }
          }
        })


        var opponent = new Sprite(32, 32);
        opponent.x = 400;
        opponent.y = 50;
        opponent.image = game.assets["fig/chara3.png"];
        opponent.frame = 3;
        opponent.scale(1.5, 1.5);

        game.rootScene.addChild(player)
        game.rootScene.addChild(opponent)


        //game.pushScene(TitleScene); //タイトルシーンに遷移
    }
    game.start(); //ゲーム開始
}
