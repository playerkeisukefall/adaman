function rm_bullet(b_id){
  for(let i=0; i<bullet.length; i++){
    if(bullet[i].b_id == b_id){
      bullet.splice(i,1);
      bullet_exist.splice(i,1);
    }
  }
}

let bullet_enterframe = function(){
  this.x += this.speed_x;
  this.y += this.speed_y;
  if(this.intersect(right_bar) || this.intersect(left_bar)){
    this.speed_x = -1 * this.speed_x;
  }
  if(this.y < 0 || 600 < this.y) {
    this.parentNode.removeChild(this);
  }
  // 衝突判定
  if(this.intersect(opponent)){
    this.parentNode.removeChild(this);
    rm_bullet(this.b_id);
    op_damaged = true;
    op_damaged_fin_step = step + 20;
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
      b_len = bullet.length;
      bullet[b_len] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", undefined, undefined, undefined, {x:0,y:-b_speed}, bullet_pow.D, b_id);
      b_id += 1;
      bullet[b_len].on('enterframe', bullet_enterframe);
      shot_available.D = false;
    }
  }
  if (game.input.key_s){
    if(shot_available.S == true){
      b_len = bullet.length;
      bullet[b_len] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", 0, {x:0.7,y:0.7}, undefined, {x:b_speed/2,y:-b_speed/2}, bullet_pow.S, b_id);
      b_id += 1;
      bullet[b_len+1] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", 0, {x:0.7,y:0.7}, undefined, {x:-b_speed/2,y:-b_speed/2}, bullet_pow.S, b_id);
      b_id += 1;
      bullet[b_len].on('enterframe', bullet_enterframe);
      bullet[b_len+1].on('enterframe', bullet_enterframe);
      shot_available.S = false;
    }
  }
  if (game.input.key_a){
    if(shot_available.A == true){
      b_len = bullet.length;
      bullet[b_len] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_red.png", undefined, {x:1.5,y:1.5}, undefined, {x:0,y:-b_speed*1.3}, bullet_pow.A, b_id);
      b_id += 1;
      bullet[b_len].on('enterframe', bullet_enterframe);
      shot_available.A = false;
    }
  }
  if (game.input.space){
    if(win == true || lose == true){
      console.log("win: " + win + " / lose: " + lose);
      location.href = "../title/title.html";
    }
  }
  if (game.input.up){
    console.log(bullet);
  }
  if (game.input.down){
    console.log(bullet_exist);
  }

  for(let but in interval_){
    if(start == true && finish == false && shot_available[but] == false){
      interval_count[but] += 1;
      if(interval_count[but] >= interval_[but]){
        shot_available[but] = true;
        interval_count[but] = 0;
        console.log(but + ": shot available");
      }
    }
  }
  update_bullet();

  if(damaged == true && lose == false){
    if(step <= damaged_fin_step){
      if(this.frame == 0)this.frame = 1;
      else this.frame = 0;
    }
    else{
      damaged = false;
      this.frame = 0;
    }
  }
}

function op_explos(){
  opponent.frame = 1;
  game.fps = 10;
  explosion = create_sprite({w:16,h:16}, {x:opponent.x+35,y:opponent.y+35}, "fig/effect0.png", 0, {x:8,y:8});
  explosion.on('enterframe', function(){
    if(this.frame == 4){
      this.parentNode.removeChild(this);
    }
    this.frame += 1;
  })
}

function explos(){
  player.frame = 1;
  game.fps = 10;
  explosion = create_sprite({w:16,h:16}, {x:player.x+35,y:player.y+35}, "fig/effect0.png", 0, {x:8,y:8});
  explosion.on('enterframe', function(){
    if(this.frame == 4){
      this.parentNode.removeChild(this);
    }
    this.frame += 1;
  })
}

let hp_bar_enterframe = function(){
  let frame = Math.floor((hp * hp_init**-1) * 30);
  frame = 30 - frame;
  this.frame = frame;
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

let opponent_enterframe = function(){
  if(op_damaged == true){
    if(step <= op_damaged_fin_step){
      if(this.frame == 0)this.frame = 1;
      else this.frame = 0;
    }
    else{
      op_damaged = false;
      this.frame = 0;
    }
  }
}
