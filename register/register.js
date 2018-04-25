const path = require("path");
const fs = require("fs");
const client = require("socket.io-client");

const server_path = path.join(__dirname, "../info/server_url.txt");
const server_url = fs.readFileSync(server_path, "utf-8");
const socket = client.connect(server_url);

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

function post(){
  let user_name = document.register.name.value;
  socket.emit('register_name', {name: user_name});
}

socket.on('register_return', function(data){
  console.log(data);
  if(data.status == "fail"){
    alert("半角英数字で入力してくれYO!! by 原");
  }
  else{
    console.log(__dirname);
    fs.appendFileSync(path.join(__dirname, "../info/user_info.csv"), data.user_name + "," + data.user_id + "\n");
    location.href = "ok.html";
  }
})
