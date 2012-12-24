#!/bin/env node

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.env.PORT || process.env.OPENSHIFT_INTERNAL_PORT || process.env.VCAP_APP_PORT || 8888,
    host  = process.env.OPENSHIFT_INTERNAL_IP || "0.0.0.0";

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(__dirname, uri);

  path.exists(filename, function(exists) {
    if(!exists) {
        filename = path.join(__dirname, "index.html");
      
      // response.writeHead(404, {"Content-Type": "text/plain"});
      // response.write("404 Not Found\n");
      // response.end();
      // return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var opts;
      if (filename.indexOf(".js") > 0) {
          opts = {"Content-Type": "application/x-javascript"};
      }
      if (filename.indexOf(".css") > 0) {
          opts = {"Content-Type": "text/css"};
      }
      response.writeHead(200, opts);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10), host);

console.log("Tasks.IO running at\n => http://" + host + ":" + parseInt(port, 10) + "/\nCTRL + C to shutdown");

