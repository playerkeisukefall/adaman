let normal_enterframe = function(){
  this.x += this.speed_x;
  this.y += this.speed_y;
  if(this.intersect(right_bar) || this.intersect(left_bar)){
    this.speed_x = -1 * this.speed_x;
  }
  if(this.y < 0 || 600 < this.y) {
    this.parentNode.removeChild(this);
  }
}

let double1_enterframe = function(){
  this.x += this.speed_x;
  this.y += this.speed_y;
  if(this.intersect(right_bar) || this.intersect(left_bar)){
    this.speed_x = -1 * this.speed_x;
  }
  if(this.y < 0 || 600 < this.y) {
    this.parentNode.removeChild(this);
  }
}
let double2_enterframe = function(){
  this.x += this.speed_x;
  this.y += this.speed_y;
  if(this.intersect(right_bar) || this.intersect(left_bar)){
    this.speed_x = -1 * this.speed_x;
  }
  if(this.y < 0 || 600 < this.y) {
    this.parentNode.removeChild(this);
  }
}

let power_enterframe = function(){
  this.x += this.speed_x;
  this.y += this.speed_y;
  if(this.intersect(right_bar) || this.intersect(left_bar)){
    this.speed_x = -1 * this.speed_x;
  }
  if(this.y < 0 || 600 < this.y) {
    this.parentNode.removeChild(this);
  }
}

let player_enterframe = function(){
  step += 1;
  sync_info();
  if (game.input.left){
    this.x -= speed;
    if (this.x <= 150) this.x = 150;
  }
  if (game.input.right){
    this.x += speed;
    if (this.x >= 580) this.x = 580;
  }
  if (game.input.key_d){
    if(shot_available.D == true){
      bullet[b_id] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", undefined, undefined, undefined, {x:0,y:-b_speed}, bullet_pow.D);
      bullet[b_id].on('enterframe', normal_enterframe);
      shot_available.D = false;
    }
  }
  if (game.input.key_s){
    if(shot_available.S == true){
      bullet[b_id] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", 0, {x:0.7,y:0.7}, undefined, {x:b_speed/2,y:-b_speed/2}, bullet_pow.S);
      bullet[b_id+1] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", 0, {x:0.7,y:0.7}, undefined, {x:-b_speed/2,y:-b_speed/2}, bullet_pow.S);
      bullet[b_id].on('enterframe', double1_enterframe);
      bullet[b_id+1].on('enterframe', double2_enterframe);
      shot_available.S = false;
    }
  }
  if (game.input.key_a){
    if(shot_available.A == true){
      bullet[b_id] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_red.png", undefined, {x:1.5,y:1.5}, undefined, {x:0,y:-b_speed*1.3}, bullet_pow.A);
      bullet[b_id].on('enterframe', power_enterframe);
      shot_available.A = false;
    }
  }
  if (game.input.space){
    console.log(shot_available.A)
  }
  if (game.input.up){
    console.log(bullet);
  }
  if (game.input.down){
    console.log(bullet_exist);
  }

  for(let but in interval_){
    if(shot_available[but] == false){
      interval_count[but] += 1;
      if(interval_count[but] >= interval_[but]){
        shot_available[but] = true;
        interval_count[but] = 0;
        console.log(but + ": shot available");
      }
    }
  }
  /*
  if(shot_available == false){
    interval_count += 1;
    if(interval_count >= interval){
      shot_available = true;
      interval_count = 0;
      console.log("shot available")
    }
  }
  */
  update_bullet();
}

let hp_bar_enterframe = function(){
  //this.frame += 1;
}



let charge_A_enterframe = function(){
  let frm = Math.floor((interval_count.A / interval_.A) * 30);
  charge_A.frame = frm;
}
let charge_S_enterframe = function(){
  let frm = Math.floor((interval_count.S / interval_.S) * 30);
  charge_S.frame = frm;
}
let charge_D_enterframe = function(){
  let frm = Math.floor((interval_count.D / interval_.D) * 30);
  charge_D.frame = frm;
}
let mybullet_A_enterframe = function(){
  if(shot_available.A == true) mybullet_A.frame = 0;
  else mybullet_A.frame = 0;
}
let mybullet_S_enterframe = function(){
  if(shot_available.S == true) mybullet_S.frame = 0;
  else mybullet_S.frame = 0;
}
let mybullet_D_enterframe = function(){
  if(shot_available.D == true) mybullet_D.frame = 0;
  else mybullet_D.frame = 0;
}
