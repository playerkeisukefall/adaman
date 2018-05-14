let start_char = [];
function display_start(){
  let start_frame = [51,52,33,50,52];
  let pos_x;
  for(let i=0; i<start_frame.length; i++){
    pos_x = 400 + (i-2)*40;
    start_char[i] = create_sprite({w:16,h:16}, {x:pos_x,y:300}, "fig/font0.png", start_frame[i], {x:3,y:3});
    setTimeout(()=>{
      start_char[i].parentNode.removeChild(start_char[i]);
    }, 1000);
  }
}

let count_down_char = [];
function timeoutPromise(num, timeout) {
    let count_frame = [0,17,18,19];
    if(num != 3) count_down_char[num+1].parentNode.removeChild(count_down_char[num+1]);
    if(num == 0) display_start();
    count_down_char[num] = create_sprite({w:16,h:16}, {x:400,y:300}, "fig/font0.png", count_frame[num], {x:3,y:3});
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve("ok");
        }, timeout);
    });
}

function count_down() {
    timeoutPromise(3, 1000).then((msg) => {
        return timeoutPromise(2, 1000);
    }).then((msg) => {
        return timeoutPromise(1, 1000);
    }).then((msg) => {
        start = true;
        shot_available.A = true;
        shot_available.S = true;
        shot_available.D = true;
        return timeoutPromise(0, 1000)
    }).catch((err) => {
      console.log(err)
    });
}

function you_win(){

}

function you_lose(){
  create_sprite({w:562,h:107}, {x:120,y:250}, "fig/you_lose.png", 0, {x:0.4,y:0.4});
}
