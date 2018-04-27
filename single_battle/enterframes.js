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
  if (game.input.left){
    this.x -= speed;
    if (this.x <= 150) this.x = 150;
  }
  if (game.input.right){
    this.x += speed;
    if (this.x >= 580) this.x = 580;
  }
  if (game.input.key_d){
    if(shot_available == true){
      bullet[b_id] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", undefined, undefined, undefined, {x:0,y:-b_speed});
      bullet[b_id].on('enterframe', normal_enterframe);
      shot_available = false;
    }
  }
  if (game.input.key_s){
    if(shot_available == true){
      bullet[b_id] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", 0, {x:0.7,y:0.7}, undefined, {x:b_speed/2,y:-b_speed/2});
      bullet[b_id+1] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png", 0, {x:0.7,y:0.7}, undefined, {x:-b_speed/2,y:-b_speed/2});
      bullet[b_id].on('enterframe', double1_enterframe);
      bullet[b_id+1].on('enterframe', double2_enterframe);
      shot_available = false;
    }
  }
  if (game.input.key_a){
    if(shot_available == true){
      bullet[b_id] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_red.png", undefined, {x:1.5,y:1.5}, undefined, {x:0,y:-b_speed*1.3});
      bullet[b_id].on('enterframe', power_enterframe);
      shot_available = false;
    }
  }
  if (game.input.space){
    console.log("space")
  }
  if (game.input.up){
    console.log(bullet);
  }
  if (game.input.down){
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
  update_bullet();
}
