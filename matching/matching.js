const path = require("path");
const fs = require("fs");
const client = require("socket.io-client");

const server_path = path.join(__dirname, "../info/server_url.txt");
const server_url = fs.readFileSync(server_path, "utf-8");
const socket = client.connect(server_url);

const CSV = require('comma-separated-values');

let csv_path = path.join(__dirname, "../info/user_info.csv")
let csv_data = fs.readFileSync(csv_path, "utf-8");
let tmp = new CSV(csv_data, {header:false});
let data = tmp.parse();
let user_name = data[0][0];
let user_id = data[0][1];
console.log("user_name: ", user_name);
console.log("user_id: ", user_id);

let connection_status = "fail";
let status = "waiting";


socket.on('news', function (data) {
  // サーバから受け取ったデータを出力する
  console.log(data);
  socket.emit('my other event', { my: 'data' });
  connection_status = "success";
});

// 接続チェック ******************************************************
let time = new Date();
let updated_time = time.getTime();
socket.on('connection_check', function (data) {
  connection_status = "success";
  time = new Date();
  updated_time = time.getTime();
});
setInterval(function(){
  time = new Date();
  if(time.getTime() - updated_time >= 2000){
    connection_status = "fail";
    console.log("connection failed");
  }
}, 1000);
// *****************************************************************

// 待ち状態を知らせ続ける & 対戦可能状態にstatusを変更 ********************
function rm_myself(player_arr){
  for(let i=0; i<player_arr.length; i++){
    if(user_id == player_arr[i].user_id){
      player_arr.splice(i,1); // 配列から自分の情報を削除
      return player_arr;
    }
  }
  return player_arr;
}
let player_arr;
setInterval(function(){
  socket.emit("waiting", {user_name: user_name, user_id: user_id});
}, 1000);
socket.on("room_info", function(data){
  player_arr = rm_myself(data.player_arr);
  if(player_arr.length >= 1 && status != "ready") status = "battle_available";
  else if(status != "ready") {
    status = "waiting";
    console.log(player_arr);
  }
});
// *****************************************************************

// html の書き換え ***************************************************
function show(){
  let i = 0;
  let dots = [".", "..", "..."];
  setInterval(function(){
    // 接続 失敗
    if(connection_status == "fail"){
      let str_forHTML = "サーバに接続できません<br>";
      str_forHTML += "原に問い合わせてください";
      document.getElementById('show').innerHTML = str_forHTML;
    }
    // 接続 ok
    else{
      if(status == "waiting"){ // 待ち状態
        let str_forHTML = "";
        str_forHTML += "対戦相手を探しています";
        str_forHTML += dots[i];
        i += 1;
        if(i == 3) i = 0;
        document.getElementById('show').innerHTML = str_forHTML;
      }

      if(status == "battle_available"){
        let str_forHTML = "対戦相手を見つけました!!<br>";
        for(let i=0; i<player_arr.length; i++){
          str_forHTML += " ＊ " + player_arr[i].user_name + " ";
          str_forHTML += '<input type="button" value="対戦する" onclick="ready('+ player_arr[i].user_id + ')">';
          str_forHTML += "<br>";
        }
        document.getElementById('show').innerHTML = str_forHTML;
      }

      if(status == "ready"){
        let str_forHTML = "";
        str_forHTML += "対戦準備中";
        str_forHTML += dots[i];
        i += 1;
        if(i == 3) i = 0;
        document.getElementById('show').innerHTML = str_forHTML;
      }
    }

  }, 1000);
}
// *****************************************************************

// 対戦準備中
function ready(opponent_id){
  console.log(opponent_id);
  status = "ready";
  setInterval(function(){
    socket.emit("ready", {user_id: user_id, opponent_id: opponent_id});
  }, 1000);
  socket.on("lets_battle", function(data){
    console.log(data);
  })
  //location.href = "../multi_battle/battle.html";
}
