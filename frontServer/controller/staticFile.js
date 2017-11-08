const fs = require("fs");
const path = require("path");
const url = require("url");
var staticFile = function(req, rep) {
    //获得req的文件目录
    let root = path.resolve("./staticFile");
    let urlPath = url.parse(req.url).pathname;
    let realPath = path.join(root, urlPath);
    //文件处理
    fs.stat(realPath, function(err, stats) {
        if (!err && stats.isFile()) {
            //直接返回找到的数据
            console.log("200" + req.url);
            rep.writeHead(200);
            fs.createReadStream(realPath).pipe(rep);
        } else {
            //404notfound
            console.log("404", req.url);
            rep.writeHead(404);
            rep.end("404 not found");
        }
    });
}

module.exports = {
    "Sta": staticFile
}