
const path = require('path');
const fs = require('fs');
const fig_path = path.join(__dirname, "fig/.");
fs.readdir(fig_path, function(err, files){
    //if (err) throw err;
    var fileList = files.filter(function(file){
        //return fs.statSync(file).isFile() && /.*\.csv$/.test(file); //絞り込み
        //return fs.statSync(file).isFile()
        return file
    })
    console.log(fileList);
});
