// const fs = require('fs');
// const path = require('path');
const handler = require('./handler');

const router = (request, response) => {
  const { url } = request;
  console.log(url);
  if (url === '/') {
    handler.handlerHome(request, response);
  } else if (url.indexOf('/public') !== -1) {
    handler.handlerPublic(request, response, url);
  } else if (url.indexOf('/search?sources=') !== -1) {
    handler.handlerSearch(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1> 404 not found </h1>');
  }
};

module.exports = router;
