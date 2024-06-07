require('dotenv').config();
require('newrelic');
var express = require('express');
var cors=require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const middlewares = [
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  cors(),
  express.static(path.join(__dirname, '../../public')) // Adjust path based on your project structure
];



  module.exports={middlewares}