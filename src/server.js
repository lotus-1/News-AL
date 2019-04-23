const http = require('http');

const port = 4000;
const router = require('./router');


const server = http.createServer(router);
server.listen(port);
