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
console.log('requestUrl', request.url);
const parseRequest = url.parse(request.url);
console.log('parse', parseRequest);
const parseQuery = parseRequest.query;
console.log(parseQuery);
const userInput = querystring.parse(parseQuery).sources;
console.log(userInput);
const myUrl = 'https://newsapi.org/v2/sources?apiKey=ed9cab572cab44078dc8c8a83f6c10b5';
console.log(myUrl);
requester(myUrl, (err, res, body) => {
  //console.log('body is', JSON.parse(body));
  if (err) {
    console.log('err', err);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('There is a server error');
  } else {
    const parseData = JSON.parse(body);
    const arrayOfObj = parseData.sources;
    console.log(arrayOfObj);
 // const objIndex = arrayOfObj.findIndex((obj => obj.id === userInput));
 // console.log(objIndex);
 // console.log(arrayOfObj[objIndex].id);
    // arrayOfObj.filter(el => el[url])
    // console.log(arrayOfObj);
    let result = [];
arrayOfObj.forEach((obj) => {
  let id = obj.id;
  let url = obj.url;
  console.log(id);
  console.log(url);
  if(id.indexOf(userInput) !== -1){
    result.push(url);
  }
//result.push(id);
})
console.log(result[0]);
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
