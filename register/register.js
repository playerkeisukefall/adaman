const server = "http://localhost:8080";
const socket = io('http://localhost:8080');
const fs = require("fs");

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
    fs.appendFileSync("user_info.csv", data.user_name + "," + data.user_id + "\n");
    location.href = "ok.html";
  }
})
