'use strict';
var express = require('express');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var nock = require('nock');
var jsonServer = require('json-server');
var router = jsonServer.router('database/db.json'); // Returns an Express router
var path = require('path');

var address = process.argv[2] || 'localhost:9000'; // address, support 127.0.0.1:9000 or 9000
var hostName = address.indexOf(':') === -1 ? (address.indexOf('.') === -1 ? 'localhost' : address) : address.split(':')[0];
var port = address.indexOf(':') === -1 ? (address.indexOf('.') === -1 ? address : 9000) : address.split(':')[1];

// view engine setup
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

// nock setting
/*nock('http://www.baidu.com')
  .get('/')
  .reply(200, {
    _id: '123ABC',
    _rev: '946B7D1C',
    username: 'pgte',
    email: 'pedro.teixeira@gmail.com'
  });*/

app.use('/api', jsonServer.defaults);
app.use('/api', router);

// jump to index.html
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, hostName, function() {
  console.log('\nserver now has start at ' + hostName + ':' + port);
});
