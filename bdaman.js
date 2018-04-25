enchant();

window.onload = function() {
    let core = new Core(320, 320);
    core.preload('chara1.png');
    core.fps = 20;

    let GameOverScene = new Scene();
    GameOverScene.backgroundColor = "black";

    core.onload = function(){
      var bear = new Sprite(32, 32);
      bear.image = core.assets['chara1.png'];
      bear.x = 0;
      bear.y = 0;
      bear.on('enterframe', function(){
        if (core.input.left) this.x -= 5;
        if (core.input.right) this.x += 5;
        if (core.input.up) this.y -= 5;
        if (core.input.down) this.y += 5;

        if(this.intersect(bear2)){
          label.text = "hit!";
          core.pushScene(GameOverScene);
        }
      })

      var bear2 = new Sprite(32, 32);
      bear2.image = core.assets['chara1.png'];
      bear2.frame = 6;
      bear2.x = 100;
      bear2.y = 100;
      bear2.on('enterframe', function(){
        this.x += 5;
        this.frame = this.age % 3 + 5;
        if (this.x > 320) this.x = 0;
      })

      var label = new Label();
      label.x = 280;
      label.y = 5;
      label.color = 'red';
      label.font = '14px "Arial"';
      label.text = '0';
      label.on('enterframe', function() {
      label.text = (core.frame / core.fps).toFixed(2);
      })

      core.rootScene.addChild(bear)
      core.rootScene.addChild(bear2)
      core.rootScene.addChild(label)
    }


    core.start();
};
