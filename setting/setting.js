const path = require("path");
const fs = require("fs");

const server_url_path = path.join(__dirname, "../info/server_url.txt")

function post(){
  let server_url = document.setting.server_url.value;
  console.log(server_url);
  fs.unlink(server_url_path, function(err){
    console.log(err);
  });
  fs.writeFileSync(server_url_path, server_url);
}
