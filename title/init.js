const fs = require("fs");
const path = require("path");
function isExistFile(file) {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
}

const fig_path = path.join(__dirname, "fig/.");
const fig_list = fs.readdirSync(fig_path);

function create_sprite(size, pos, img, frame=0, scale={x:1,y:1}, rotation=0, init_speed={x:0,y:0}, bul_power=0){
  let sprite = new Sprite(size.w, size.h);
  sprite.x = pos.x;
  sprite.y = pos.y;
  sprite.image = game.assets[img];
  sprite.frame = frame;
  sprite.scale(scale.x, scale.y);
  sprite.rotation = rotation;
  sprite.speed_x = init_speed.x;
  sprite.speed_y = init_speed.y;
  sprite.scale_x = scale.x;
  sprite.scale_y = scale.y
  sprite.bul_power = bul_power;
  game.rootScene.addChild(sprite)
  return sprite
}



let back, bullet;
let title, single_battle, multi_battle, setting;

let step = 0;
let toggle = 0;
let move_available = true;
let interval_count = 0;
let move_dis = 53;

let bullet_enterframe = function(){
  step += 1;
  if(step % 15 == 0){
    if(toggle == 0) toggle = 1;
    else toggle = 0;
  }
  bullet.frame = toggle;

  if(move_available == true){
    if(game.input.up){
      if(this.y != 347){
        this.y -= move_dis;
        move_available = false;
        toggle = 0;
        step = 0;
      }
    }
    if(game.input.down){
      if(this.y != 453){
        this.y += move_dis;
        move_available = false;
        toggle = 0;
        step = 0;
      }
    }
  }

  else{ // move_available is false
    interval_count += 1;
    if(interval_count >= 3){
      move_available = true;
      interval_count = 0;
      console.log("move available");
    }
  }

  if(game.input.space) {
    // シングル対戦
    if(this.y == 347)location.href = "../single_battle/battle.html";
    // 通信対戦
    if(this.y == 400){
      if(isExistFile(path.join(__dirname, "../info/user_info.csv")) == false)location.href = "../register/register.html"; // ユーザ名ファイルが存在しない
      else location.href = "../matching/matching.html"; // ユーザ名ファイルがある
    }
    // 設定
    if(this.y == 453)location.href = "../setting/setting.html";

  }

}

// （なかったら）ステータスcsv の生成
function isExistFile(file) {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
}

const status_path = path.join(__dirname, "../status/status.csv");
if(isExistFile(status_path) != true){
  console.log("ステータスcsvが存在しないので生成")
  fs.writeFileSync(status_path, "1,1,1,1,1,1\n")
}
