let server = "http://localhost:8080";
var socket = io('http://localhost:8080');
socket.on('news', function (data) {
  // サーバから受け取ったデータを出力する
  console.log(data);

  // サーバへデータ送信
  // emit を使うとイベント名を指定できる
  socket.emit('my other event', { my: 'data' });
});
