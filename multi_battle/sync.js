let op_bullet = [];


function update_opponent(op_info){
  opponent.x = 800 - op_info.x - 70;
}

function isExistBullet(op_b_id){
  for(let i=0; i<op_bullet.length; i++){
    if(op_b_id == op_bullet[i].b_id) return true;
  }
  return false;
}

let op_b_enterframe = function(){
  this.x -= this.speed_x;
  this.y -= this.speed_y;
  if(this.intersect(right_bar) || this.intersect(left_bar)){
    this.speed_x = -1 * this.speed_x;
  }
  if(this.y < 0 || 600 < this.y) {
    this.parentNode.removeChild(this);
  }
  // 衝突判定
  if(this.intersect(player)){
    this.parentNode.removeChild(this);
    damaged = true;
    damaged_fin_step = step + 20;
    hp -= this.bul_power;
    if(hp <= 0) hp = 0;
    console.log(hp);
  }
}

function rm_op_bullet(op_bullet_exist){
  let len = op_bullet.length;
  for(let i=0; i<op_bullet.length; i++){
    let flag = false;
    for(let j=0; j<op_bullet_exist.length; j++){
      if(op_bullet[i].b_id == op_bullet_exist[i]){
        flag = true;
      }
    }
    if(flag == false){
      op_bullet.splice(i,1);
    }
  }
}

function add_op_bullet(op_b){
  let op_b_len = op_bullet.length;
  //console.log(op_b_len);
  let init_x = 799 - (op_b.x + 16*op_b.scale_x);
  let init_y = 599 - (op_b.y + 16*op_b.scale_y);
  op_bullet[op_b_len] = create_sprite({w:16,h:16}, {x:init_x,y:init_y}, op_b.img_file, undefined, {x:op_b.scale_x,y:op_b.scale_y}, undefined, {x:op_b.speed_x,y:op_b.speed_y}, op_b.bul_power, op_b.b_id);
  op_bullet[op_b_len].on('enterframe', op_b_enterframe);
}

function update_op_bullet(op_bullet_info, op_bullet_exist){
  rm_op_bullet(op_bullet_exist);
  let num_of_op_bullet = op_bullet_exist.length;
  let rm_index;
  for(let i=0; i<num_of_op_bullet; i++){
    if(isExistBullet(op_bullet_exist[i]) == false){
      add_op_bullet(op_bullet_info[i]);
      console.log(op_bullet_exist);
    }
  }
}

function sync_info(){

  if(step % 1 == 0){
    let bullet_info_arr = [];
    for(let i=0; i<bullet.length; i++){
      let b = bullet[i];
      bullet_info_arr.push({
        x: b.x,
        y: b.y,
        img_file: b.img_file,
        frame: b.frame,
        scale_x: b.scale_x,
        scale_y: b.scale_y,
        rotation: b.rotation,
        speed_x: b.speed_x,
        speed_y: b.speed_y,
        bul_power: b.bul_power,
        b_id: b.b_id});
    }
    let plr = {
      x: player.x,
      y: player.y,
      frame: player.frame
    }
    socket.emit("on_battle_submit", {
      user_id: user_id,
      player_info: plr,
      bullet_info: bullet_info_arr,
      bullet_exist: bullet_exist
    })
  }

  socket.on("on_battle_get", function(data){
    update_opponent(data.player_info);
    update_op_bullet(data.bullet_info, data.bullet_exist);
  })

}
