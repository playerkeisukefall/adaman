enchant(); //enchant.jsを使い始めるためのおまじない
window.onload = function() {
    game = new Core(800, 600);
    game.fps = 10
    //画像の読み込み
    //game.preload("adaman_title.png", "startButton.png");
    game.preload("fig/adaman_title.png", "fig/arrow.png", "fig/start.png");

    game.onload = function() { //準備が整ったら
      game.keybind(32, 'space');
        var background = new Sprite(800, 600);
        background.x = 0;
        background.y = 0;
        background.image = game.assets["fig/adaman_title.png"];

        var arrow = new Sprite(50, 50);
        arrow.x = 200;
        arrow.y = 450;
        arrow.image = game.assets["fig/arrow.png"]
        arrow.on('enterframe', function(){
          if (game.input.up) this.y -= 50;
          if (game.input.down) this.y += 50;
          if (game.input.space) location.href = "../index.html";
        });


        var start = new Sprite(100, 40);
        start.x = 300;
        start.y = 450;
        start.image = game.assets["fig/start.png"]

        game.rootScene.addChild(background)
        game.rootScene.addChild(arrow)
        game.rootScene.addChild(start)
        //game.pushScene(TitleScene); //タイトルシーンに遷移
    }
    game.start(); //ゲーム開始
}
