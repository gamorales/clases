const http = require('http');

function responseRequest(request, response) {
    response.end('Hola Mundo!');
}

let server = http.createServer(responseRequest);

server.listen(3000);