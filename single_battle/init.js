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

let back;
let left_bar;
let right_bar, player, opponent, hp_bar, H, P;
let s_normal, s_power, s_double;
let s_normal_charge, s_power_charge, s_double_charge;
let bullet = [];
let bullet_exist = [];
let b_id = 0; // bullet id
let interval_count = 0;
let shot_available = true;


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

const fig_path = path.join(__dirname, "fig/.");
let fig_list;
fs.readdir(fig_path, function(err, files){
    fig_list = files.filter(function(file){
        return file
    })
    console.log(fig_list);
});


function update_bullet(){
  let len = bullet.length;
  b_id = len;
  let rm_index;
  for(let i=0; i<len; i++){
    if(0 <= bullet[i].y && bullet[i].y <= window_height)
      bullet_exist[i] = 1;
    else{
      bullet_exist[i] = 0;
      rm_index = i;
    }
  }
  if(rm_index != undefined){
    bullet.splice(rm_index,1);
    bullet_exist.splice(rm_index,1);
    b_id -= 1;
  }
}

function create_sprite(size, pos, img, frame=0, scale={x:1,y:1}, rotation=0, init_speed={x:0,y:0}){
  let sprite = new Sprite(size.w, size.h);
  sprite.x = pos.x;
  sprite.y = pos.y;
  sprite.image = game.assets[img];
  sprite.frame = frame;
  sprite.scale(scale.x, scale.y);
  sprite.rotation = rotation;
  sprite.speed_x = init_speed.x;
  sprite.speed_y = init_speed.y;
  game.rootScene.addChild(sprite)
  return sprite
}
