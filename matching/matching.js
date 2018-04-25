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


socket.on('news', function (data) {
  // サーバから受け取ったデータを出力する
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

setInterval(function(){
  socket.emit("waiting", {user_name: user_name, user_id: user_id});
}, 1000);
