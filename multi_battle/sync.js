function update_opponent(op_info){
  opponent.x = 800 - op_info.x;
}

function sync_info(){

  if(step % 3){
    let bullet_info_arr = [];
    for(let i=0; i<bullet.length; i++){
      let b = bullet[i];
      bullet_info_arr.push([b.x, b.y, b.image, b.frame, b.scale_x, b.scale_y, b.rotation, b.speed_x, b.speed_y, b.bul_power]);
    }
    let plr = [player.x, player.y, player.frame]
    socket.emit("on_battle_submit", {
      user_id: user_id,
      player_info: plr,
      bullet_info: bullet_info_arr
    })
  }

  socket.on("on_battle_get", function(data){
    if(user_id != data.user_id){ // 対戦相手のデータだったら
      update_opponent(data.player_info);

    }
  })

}
