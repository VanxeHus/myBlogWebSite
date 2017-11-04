"use strict";
var http = require("http");
var staFile = require("./controller/staticFile");
var fs = require("fs");
var path = require("path");


var server = http.createServer(function(req, rep) {
    let url = req.url;
    console.log("app,url:" + url);
    if (url == "/") {
        let realPath = path.resolve("./staticFile", "./html");
        rep.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(realPath + "/index.html").pipe(rep);
    } else {
        staFile.Sta(req, rep);
    }
});
server.listen(8080);
console.log("running");