var http = require('http');

function onRequest(request, response) {   
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getJson());
    response.end();
}
function getJson() {
    var fs = require("fs");
    var content = fs.readFileSync("posts.json");
    return content;
}
http.createServer(onRequest).listen(8000);
