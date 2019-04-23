const path = require('path');
const fs = require('fs');
const querystring = require('query-string');
const rqst = require('request');

const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry, there is Error </h1>');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

const handlerPublic = ((request, response, url) => {
  const extension = url.split('.')[1];
  const extenstionTypes = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css'
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry , I can not find the file </h1>');
    } else {
      response.writeHead(200, { 'Content-Type': extenstionTypes[extension] });
      response.end(file);
    }
  });
});

const handlerSearch = ((request, response) => {
const myUrl = 'https://newsapi.org/v2/sources?apiKey=ed9cab572cab44078dc8c8a83f6c10b5';
rqst(myUrl, (err, res, data) => {
  if (err) {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Not Found');
  } else {
    const parseData = JSON.parse(data.sources);
    console.log(parseData);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end();
  }
});
})

module.exports = {
  handlerHome,
  handlerPublic,
  handlerSearch
};
