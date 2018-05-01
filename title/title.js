
enchant(); //enchant.jsを使い始めるためのおまじない
window.onload = function() {
    game = new Core(800, 600);
    for(let i=0; i<fig_list.length; i++) game.preload("fig/" + fig_list[i]);
    game.fps = 20
    game.preload("fig/adaman_title.png", "fig/tri.png", "fig/single_battle.png", "fig/connection_battle.png", "fig/setting.png");

    let arrow_available = true;
    let interval_count = 0;
    game.onload = function() { //準備が整ったら
      game.keybind(32, 'space');

        back = create_sprite({w:500,h:600}, {x:0,y:0}, "fig/back2.png", 0, {x:2.5,y:1});
        title = create_sprite({w:400,h:93}, {x:210,y:150}, "fig/title2.png", 0, {x:1,y:1});
        single_battle = create_sprite({w:721,h:110}, {x:50,y:300}, "fig/single_battle.png", 0, {x:0.3,y:0.3});
        multi_battle = create_sprite({w:725,h:126}, {x:43,y:343}, "fig/multi_battle.png", 0, {x:0.3,y:0.3});
        setting = create_sprite({w:705,h:102}, {x:50,y:410}, "fig/setting.png", 0, {x:0.3,y:0.3});
        bullet = create_sprite({w:16,h:16}, {x:260,y:347}, "fig/b_blue.png", 0, {x:1.5,y:1.5});
        bullet.on('enterframe', bullet_enterframe);
    }
    game.start(); //ゲーム開始
}
