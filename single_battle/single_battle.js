let bullet_enterframe = function(){
  this.y -= b_speed;
  if(this.y < 0) {
    this.parentNode.removeChild(this);
  }
}

let player_enterframe = function(){
  if (game.input.left) this.x -= speed;
  if (this.x <= 150) this.x = 150;
  if (game.input.right) this.x += speed;
  if (this.x >= 600) this.x = 600;
  if (game.input.space){
    if(shot_available == true){
      bullet[b_id] = create_sprite({w:16,h:16}, {x:player.x+27,y:player.y-8}, "fig/b_blue.png");
      bullet[b_id].on('enterframe', bullet_enterframe);
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
}

enchant(); //enchant.jsを使い始めるためのおまじない
let game;
window.onload = function() {
    game = new Core(window_width, window_height);
    game.fps = 30
    for(let i=0; i<fig_list.length; i++) game.preload("fig/" + fig_list[i]);

    game.onload = function() { //準備が整ったら
      game.keybind(32, 'space');
      game.keybind(27, 'esc');

      left_bar = create_sprite({w:150,h:600}, {x:0,y:0}, "fig/side.png");
      right_bar = create_sprite({w:150,h:600}, {x:650,y:0}, "fig/side.png");
      H = create_sprite({w:16,h:16}, {x:680,y:30}, "fig/font0.png", 40, {x:1.5,y:1.5});
      P = create_sprite({w:16,h:16}, {x:700,y:30}, "fig/font0.png", 48, {x:1.5,y:1.5});
      hp_bar = create_sprite({w:90,h:20}, {x:680,y:50}, "fig/hp.png", 0);
      opponent = create_sprite({w:70,h:61}, {x:365,y:30}, "fig/player.png", 0, {x:1,y:1}, 180);
      player = create_sprite({w:70,h:67}, {x:365,y:503}, "fig/player.png", 0);

      interval_count = 0;
      shot_available = true;
      player.on('enterframe', player_enterframe);
    }
    game.start(); //ゲーム開始
}
