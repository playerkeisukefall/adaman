const path = require("path");
const fs = require("fs");
const client = require("socket.io-client");

const server_path = path.join(__dirname, "../info/server_url.txt");
const server_url = fs.readFileSync(server_path, "utf-8");
const socket = client.connect(server_url);

socket.on('news', function (data) {
  // サーバから受け取ったデータを出力する
  console.log(data);

  // サーバへデータ送信
  // emit を使うとイベント名を指定できる
  socket.emit('my other event', { my: 'data' });
});
