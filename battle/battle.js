const window_width = 800;
const window_height = 600;

function update_bullet_exist(bullet){
  let len = bullet.length;
  let bullet_exist = [];
  for(let i=0; i<len; i++){
    if(0 <= bullet[i].y && bullet[i].y <= window_height)
      bullet_exist.push(1);
    else
      bullet_exist.push(0);
  }
  return bullet_exist;
}

enchant(); //enchant.jsを使い始めるためのおまじない
window.onload = function() {
    game = new Core(window_width, window_height);
    game.fps = 30
    //画像の読み込み
    //game.preload("adaman_title.png", "startButton.png");
    game.preload("fig/side.png", "fig/chara3.png", "fig/icon1.png");

    let left_bar, right_bar, player, opponent;
    let bullet = [];
    let bullet_exist = [];
    let b_id = 0; // bullet id
    let interval_count = 0;
    let shot_available = true;


    game.onload = function() { //準備が整ったら
      game.keybind(32, 'space');
        // left_bar & right_bar
        left_bar = new Sprite(100, 600);
        left_bar.x = 0;
        left_bar.y = 0;
        left_bar.image = game.assets["fig/side.png"];
        game.rootScene.addChild(left_bar)
        right_bar = new Sprite(100, 600);
        right_bar.x = 700;
        right_bar.y = 0;
        right_bar.image = game.assets["fig/side.png"];
        game.rootScene.addChild(right_bar)

        // 相手
        opponent = new Sprite(32, 32);
        opponent.x = 400;
        opponent.y = 50;
        opponent.image = game.assets["fig/chara3.png"];
        opponent.frame = 3;
        opponent.scale(1.5, 1.5);
        game.rootScene.addChild(opponent)

        // プレイヤー　*******************
        player = new Sprite(32, 32);
        player.x = 400;
        player.y = 550;
        player.image = game.assets["fig/chara3.png"];
        player.frame = 18;
        player.scale(1.5, 1.5);
        interval_count = 0;
        shot_available = true;
        player.on('enterframe', function(){
          if (game.input.left) this.x -= 5;
          if (game.input.right) this.x += 5;
          if (game.input.space){
            if(shot_available == true){
              bullet[b_id] = new Sprite(16, 16);
              bullet[b_id].x = player.x + 16 - 8;
              bullet[b_id].y = player.y;
              bullet[b_id].image = game.assets["fig/icon1.png"];
              bullet[b_id].frame = 2;
              game.rootScene.addChild(bullet[b_id])
              bullet[b_id].on('enterframe', function(){
                this.y -= 5;
                if(this.y < 0) {
                  this.parentNode.removeChild(this);
                }
              })
              b_id += 1;
              shot_available = false;
            }
          }
          if (game.input.up){
            console.log(bullet);
          }
          if (game.input.down){
            console.log(bullet.length);
            console.log(bullet_exist);
          }
          if(shot_available == false){
            interval_count += 1;
            if(interval_count >= 20){
              shot_available = true;
              interval_count = 0;
              console.log("shot available")
            }
          }
          bullet_exist = update_bullet_exist(bullet);

        })
        game.rootScene.addChild(player)
        // *********************************

        //game.pushScene(TitleScene); //タイトルシーンに遷移
    }
    game.start(); //ゲーム開始
}
