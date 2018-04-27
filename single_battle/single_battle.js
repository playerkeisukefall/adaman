

enchant(); //enchant.jsを使い始めるためのおまじない
let game;
window.onload = function() {
    game = new Core(window_width, window_height);
    game.fps = 30
    for(let i=0; i<fig_list.length; i++) game.preload("fig/" + fig_list[i]);

    game.onload = function() { //準備が整ったら
      game.keybind(32, 'space');
      game.keybind(27, 'esc');
      game.keybind(65, 'key_a');
      game.keybind(83, 'key_s');
      game.keybind(68, 'key_d');

      back = create_sprite({w:500,h:600}, {x:150,y:0}, "fig/back2.png");
      left_bar = create_sprite({w:150,h:600}, {x:0,y:0}, "fig/side2.png");
      right_bar = create_sprite({w:150,h:600}, {x:650,y:0}, "fig/side2.png", undefined, undefined, 180);
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
