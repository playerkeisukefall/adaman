
function inverse_pos(bullet_info_arr){
  let op_bullet_info_arr = [];
  for(let i=0; i<bullet_info_arr.length; i++){
    op_bullet_info_arr.push(bullet_info_arr[i]);
    op_bullet_info_arr[i].x = 800 - op_bullet_info_arr[i].x - op_bullet_info_arr[i].scale_x*16;
    op_bullet_info_arr[i].y = 800 - op_bullet_info_arr[i].y - op_bullet_info_arr[i].scale_y*16;
  }
  return op_bullet_info_arr;
}

function update_opponent(op_info){
  opponent.x = 800 - op_info.x - 70;
}

check_op_b_exist(op_b_id){
  for(let i=0; i<op_bullet.length; i++){
    if(op_bullet[i].b_id == op_b_id) return op_bullet[i];
  }
  return false;
}

let op_bulet_enterframe = function(){
  this.x += this.speed_x;
  this.y += this.speed_y;
  if(this.intersect(right_bar) || this.intersect(left_bar)){
    this.speed_x = -1 * this.speed_x;
  }
  if(this.y < 0 || 600 < this.y) {
    this.parentNode.removeChild(this);
  }
}

function update_opponent_bullet(obia, op_b_exist){ // obia: op_bullet_info_arr
  for(let i in op_b_exist){
    let op_b = check_op_b_exist(op_b_exist[i])
    if(op_b != false){ // 存在する
      op_b.x = obia[i].x;
      op_b.y = obia[i].y;
    }
    else{ // 存在しない
      let op_b_len = op_bullet.length;
      op_bullet[op_b_len] = create_sprite({w:16,h:16}, {x:obia[i].x,y:obia[i].y}, obia.image, obia.frame, {x:obia.scale_x,y:obia.scale_y}, undefined, {x:0,y:obia.speed_y}, obia.bul_power, obia.b_id);
      op_bullet[op_b_len].on('enterframe', op_bulet_enterframe);
    }
  }

}

function sync_info(){

  if(step % 1 == 0){
    let bullet_info_arr = [];
    for(let i=0; i<bullet.length; i++){
      let b = bullet[i];
      bullet_info_arr.push([b.x, b.y, b.image, b.frame, b.scale_x, b.scale_y, b.rotation, b.speed_x, b.speed_y, b.bul_power, b.b_id]);
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
    let op_bullet_info_arr = inverse_pos(data.bullet_info);
    update_opponent_bullet(op_bullet_info_arr, data.bullet_exist);

  })

}
