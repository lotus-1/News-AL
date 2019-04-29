const path = require('path');
const fs = require('fs');
const querystring = require('query-string');
const requester = require('request');
const url = require('url');

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
    css: 'text/css',
    jpg: 'image/jpg',
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
const parseRequest = url.parse(request.url);
const parseQuery = parseRequest.query;
const userInput = querystring.parse(parseQuery).sources;
const myUrl = 'https://newsapi.org/v2/sources?apiKey=ed9cab572cab44078dc8c8a83f6c10b5';
requester(myUrl, (err, res, body) => {
  if (err) {
    console.log('err', err);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('There is a server error');
  } else {
    const parseData = JSON.parse(body);
    const arrayOfObj = parseData.sources;
    let result = [];
arrayOfObj.forEach((obj) => {
  let id = obj.id;
  let url = obj.url;
  if(id.indexOf(userInput) !== -1){
    result.push(url);
  }
})
    response.writeHead(200);
    response.end(JSON.stringify(result[0]));
  }
})
});

module.exports = {
  handlerHome,
  handlerPublic,
  handlerSearch
};
