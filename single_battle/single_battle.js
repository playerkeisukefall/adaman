const path = require("path");
const fs = require("fs");
const CSV = require("comma-separated-values");

const status_path = path.join(__dirname, "../status/status.csv");
const status_csv_data = fs.readFileSync(status_path, "utf-8");
const status_tmp = new CSV(status_csv_data, {header:false});
const status_data = status_tmp.parse();

const power = Number(status_data[0][0]) + 4; // 5 ~ 14
const speed = Number(status_data[0][1]) + 4; // 6 ~ 24
const b_speed = Number(status_data[0][2])*2 + 4; // 6 ~ 24
const interval = 45 - Number(status_data[0][3])*3; // 42 ~ 15
const hp = Number(status_data[0][4])*3; // 10 ~ 30
const special = Number(status_data[0][5]);

const window_width = 800;
const window_height = 600;

// 弾の設定
const bulle_class = {
  "normal": {
    "fig": "fig/icon1.png",
    "frame": 2
  },
  "power": {
    "fig": "fig/icon1.png",
    "frame": 3
  },
  "double": {
    "fig": "fig/icon1.png",
    "frame": 4
  }
}

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
    game.preload("fig/side.png", "fig/chara3.png", "fig/icon1.png", "fig/effect0.png");
    game.preload("fig/p_blue.png", "fig/p_red.png", "fig/p_green.png", "fig/p_yellow.png", "fig/p_black.png");
    game.preload("fig/hp.png", "fig/font0.png", "fig/charge.png");

    let left_bar, right_bar, player, opponent, hp, H, P;
    let s_normal, s_power, s_double;
    let s_normal_charge, s_power_charge, s_double_charge;
    let bullet = [];
    let bullet_exist = [];
    let b_id = 0; // bullet id
    let interval_count = 0;
    let shot_available = true;


    game.onload = function() { //準備が整ったら
      game.keybind(32, 'space');
      game.keybind(27, 'esc');
        // left_bar & right_bar
        left_bar = new Sprite(150, 600);
        left_bar.x = 0;
        left_bar.y = 0;
        left_bar.image = game.assets["fig/side.png"];
        game.rootScene.addChild(left_bar)
        right_bar = new Sprite(150, 600);
        right_bar.x = 650;
        right_bar.y = 0;
        right_bar.image = game.assets["fig/side.png"];
        game.rootScene.addChild(right_bar)

        // 文字 'H'
        H = new Sprite(16, 16);
        H.x = 680;
        H.y = 30;
        H.image = game.assets["fig/font0.png"];
        H.frame = 40;
        H.scale(1.5, 1.5);
        game.rootScene.addChild(H);

        // 文字 'P'
        P = new Sprite(16, 16);
        P.x = 700;
        P.y = 30;
        P.image = game.assets["fig/font0.png"];
        P.frame = 48;
        P.scale(1.5, 1.5);
        game.rootScene.addChild(P);

        // HPバー
        hp = new Sprite(90, 20);
        hp.x = 680;
        hp.y = 50;
        hp.image = game.assets["fig/hp.png"];
        hp.frame = 0;
        game.rootScene.addChild(hp)

        // 弾の表示 : normal弾
        s_normal = new Sprite(16, 16);
        s_normal.x = 680;
        s_normal.y = 200;
        s_normal.image = game.assets[bulle_class.normal.fig];
        s_normal.frame = bulle_class.normal.frame;
        s_normal.scale(1.5, 1.5);
        game.rootScene.addChild(s_normal);

        // normal弾のチャージバー
        s_normal_charge = new Sprite(90, 20);
        s_normal_charge.x = 680;
        s_normal_charge.y = 230;
        s_normal_charge.image = game.assets["fig/charge.png"];
        s_normal_charge.frame = 29;
        game.rootScene.addChild(s_normal_charge);

        // 相手
        opponent = new Sprite(32, 32);
        opponent.x = 400;
        opponent.y = 50;
        opponent.image = game.assets["fig/chara3.png"];
        opponent.frame = 3;
        opponent.scale(1.5, 1.5);
        game.rootScene.addChild(opponent)

        // プレイヤー　***************************************
        player = new Sprite(50, 24);
        player.rotation = 180;
        player.x = 400;
        player.y = 550;
        player.image = game.assets["fig/p_blue.png"];
        player.frame = 18;
        player.scale(1.5, 1.5);
        interval_count = 0;
        shot_available = true;
        player.on('enterframe', function(){
          if (game.input.left) this.x -= speed;
          if (this.x <= 150) this.x = 150;
          if (game.input.right) this.x += speed;
          if (this.x >= 600) this.x = 600;
          if (game.input.space){
            if(shot_available == true){
              bullet[b_id] = new Sprite(16, 16);
              bullet[b_id].x = player.x + 16 - 8;
              bullet[b_id].y = player.y;
              bullet[b_id].image = game.assets["fig/icon1.png"];
              bullet[b_id].frame = 2;
              game.rootScene.addChild(bullet[b_id])
              bullet[b_id].on('enterframe', function(){
                this.y -= b_speed;
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
            if(interval_count >= interval){
              shot_available = true;
              interval_count = 0;
              console.log("shot available")
            }
          }
          bullet_exist = update_bullet_exist(bullet);
        })
        game.rootScene.addChild(player)
        // *********************************************************

        //game.pushScene(TitleScene); //タイトルシーンに遷移
    }
    game.start(); //ゲーム開始
}
