

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
      mybullet_A = create_sprite({w:16,h:16}, {x:150+35,y:575}, "fig/b_red.png", undefined, {x:1.5,y:1.5});
      mybullet_S = create_sprite({w:32,h:16}, {x:316+35,y:575}, "fig/double_icon.png", undefined, {x:0.8,y:0.8});
      mybullet_D = create_sprite({w:16,h:16}, {x:482+35,y:575}, "fig/b_blue.png");
      A = create_sprite({w:16,h:16}, {x:150+10,y:578}, "fig/font0.png", 33, {x:1.5,y:1.5});
      S = create_sprite({w:16,h:16}, {x:316+10,y:578}, "fig/font0.png", 51, {x:1.5,y:1.5});
      D = create_sprite({w:16,h:16}, {x:482+10,y:578}, "fig/font0.png", 36, {x:1.5,y:1.5});
      charge_A = create_sprite({w:90,h:20}, {x:150+50,y:580}, "fig/charge.png", 0, {x:0.8,y:0.2});
      charge_S = create_sprite({w:90,h:20}, {x:316+50,y:580}, "fig/charge.png", 0, {x:0.8,y:0.2});
      charge_D = create_sprite({w:90,h:20}, {x:482+50,y:580}, "fig/charge.png", 0, {x:0.8,y:0.2});
      hp_bar = create_sprite({w:90,h:20}, {x:680,y:50}, "fig/hp.png", 0);
      opponent = create_sprite({w:70,h:61}, {x:365,y:50}, "fig/player.png", 0, {x:1,y:1}, 180);
      player = create_sprite({w:70,h:67}, {x:365,y:483}, "fig/player.png", 0);

      /*
      interval_count = 0;
      shot_available = true;
      */
      player.on('enterframe', player_enterframe);
      opponent.on('enterframe', opponent_enterframe)
      hp_bar.on('enterframe', hp_bar_enterframe);
      charge_A.on('enterframe', charge_A_enterframe);
      charge_S.on('enterframe', charge_S_enterframe);
      charge_D.on('enterframe', charge_D_enterframe);
      mybullet_A.on('enterframe', mybullet_A_enterframe);
      mybullet_S.on('enterframe', mybullet_S_enterframe);
      mybullet_D.on('enterframe', mybullet_D_enterframe);

    }
    game.start(); //ゲーム開始
}
