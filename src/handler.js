const path = require('path');
const fs = require('fs');
const querystring = require('query-string');
const requester = require('request');
const url = require('url');


// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('ed9cab572cab44078dc8c8a83f6c10b5');
// // To query /v2/top-headlines
// // All options passed to topHeadlines are optional, but you need to include at least one of them
// newsapi.v2.topHeadlines({
//   sources: 'bbc-news,the-verge',
//   q: 'bitcoin',
//   category: 'business',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
// });
// // To query /v2/everything
// // You must include at least one q, source, or domain
// newsapi.v2.everything({
//   q: 'bitcoin',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk, techcrunch.com',
//   from: '2017-12-01',
//   to: '2017-12-12',
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 2
// }).then(response => {
//   console.log(response);
// });
// // To query sources
// // All options are optional
// newsapi.v2.sources({
//   category: 'technology',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
// });

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
    for(var obj in arrayOfObj) {
      if(arrayOfObj.hasOwnProperty(obj)) {
        for(var prop in arrayOfObj[obj]) {
          if(arrayOfObj[obj].hasOwnProperty(prop)) {
            if (prop ==url) {
              prop;
            }
          }
        }
      }
    }
// const i = 0;
// arrayOfObj.forEach((char) => {
//   const id = arrayOfObj[i].id;
//   const url = arrayOfObj[i].url;
//   console.log(id);
//   console.log(url);
// //  i = i + 1;
// });

    //console.log(parseData.sources[0].url);
    // const parseUrl = JSON.parse(parseData);
    // console.log(parseUrl);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end();
  }
})
});

module.exports = {
  handlerHome,
  handlerPublic,
  handlerSearch
};
