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
let hp = Number(status_data[0][4])*6 + 24; // 30 ~ 84
const hp_init = hp;

const user_info_path = path.join(__dirname, "../info/user_info.csv")
const user_info_csv_data = fs.readFileSync(user_info_path, "utf-8");
const user_info_tmp = new CSV(user_info_csv_data, {header:false});
const user_info_data = user_info_tmp.parse();
const user_name = user_info_data[0][0];
const user_id = user_info_data[0][1];
console.log("user_name: ", user_name);
console.log("user_id: ", user_id);

const client = require("socket.io-client");
const server_path = path.join(__dirname, "../info/server_url.txt");
const server_url = fs.readFileSync(server_path, "utf-8");
const socket = client.connect(server_url);

const window_width = 800;
const window_height = 600;

let opponent;

let step = 0;
let lose = false;
let back;
let left_bar, right_bar;
let player, hp_bar, H, P, mybullet_D, mybullet_S, mybullet_A, A, S, D, charge_A, charge_S, charge_D;
let s_normal, s_power, s_double;
let s_normal_charge, s_power_charge, s_double_charge;
let bullet = [];
let bullet_exist = [];
let b_id = 1;
let b_len = 0;
let damaged = false;
let damaged_fin_step;
let op_damaged = false;
let op_damaged_fin_step;
let count_down_start = false;
let start = false;
let finish = false;
let interval_ = {
  A: Math.floor(interval * 3.0), // パワー弾
  S: Math.floor(interval * 2.0), // ダブル弾
  D: interval // ノーマル弾
}
let interval_count = {
  A: 0,
  S: 0,
  D: 0
};
let shot_available = {
  A: false,
  S: false,
  D: false
};
let bullet_pow = {
  A: Math.floor(power * 2.0), // パワー弾
  S: Math.floor(power * 0.5), // ダブル弾
  D: power // ノーマル弾
}




const fig_path = path.join(__dirname, "fig/.");
const fig_list = fs.readdirSync(fig_path);


function update_bullet(){
  let len = bullet.length;
  b_len = len;
  let rm_index;
  for(let i=0; i<len; i++){
    if(0 <= bullet[i].y && bullet[i].y <= window_height){
      bullet_exist[i] = bullet[i].b_id;
    }
    else{
      //bullet_exist[i] = 0;
      rm_index = i;
    }
  }
  if(rm_index != undefined){
    bullet.splice(rm_index,1);
    bullet_exist.splice(rm_index,1);
    b_len -= 1;
  }
}

function create_sprite(size, pos, img, frame=0, scale={x:1,y:1}, rotation=0, init_speed={x:0,y:0}, bul_power=0, b_id=0){
  let sprite = new Sprite(size.w, size.h);
  sprite.x = pos.x;
  sprite.y = pos.y;
  sprite.image = game.assets[img];
  sprite.img_file = img;
  sprite.frame = frame;
  sprite.scale(scale.x, scale.y);
  sprite.rotation = rotation;
  sprite.speed_x = init_speed.x;
  sprite.speed_y = init_speed.y;
  sprite.scale_x = scale.x;
  sprite.scale_y = scale.y
  sprite.bul_power = bul_power;
  sprite.b_id = b_id;
  game.rootScene.addChild(sprite)
  return sprite
}
