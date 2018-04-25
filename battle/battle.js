enchant(); //enchant.jsを使い始めるためのおまじない
window.onload = function() {
    game = new Core(800, 600);
    game.fps = 30
    //画像の読み込み
    //game.preload("adaman_title.png", "startButton.png");
    game.preload("fig/side.png", "fig/chara3.png");

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

        var myself = new Sprite(32, 32);
        myself.x = 400;
        myself.y = 550;
        myself.image = game.assets["fig/chara3.png"];
        myself.frame = 18;
        myself.scale(1.5, 1.5);
        myself.on('enterframe', function(){
        if (game.input.left) this.x -= 5;
        if (game.input.right) this.x += 5;
        })


        var opponent = new Sprite(32, 32);
        opponent.x = 400;
        opponent.y = 50;
        opponent.image = game.assets["fig/chara3.png"];
        opponent.frame = 3;
        opponent.scale(1.5, 1.5);

        game.rootScene.addChild(myself)
        game.rootScene.addChild(opponent)


        //game.pushScene(TitleScene); //タイトルシーンに遷移
    }
    game.start(); //ゲーム開始
}
