const http = require('http');

// Route Setup
const prove01Routes = require('./prove01-routes');

const server = http.createServer(prove01Routes.handler);

server.listen(3000);