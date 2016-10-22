'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');
const userRouter = express.Router();
const env = process.env.NODE_ENV || 'devlopment';
const CONFIG = require('./config/config.json')[env];
const port = process.env.PORT || CONFIG.port || 3000;
const url = process.env.URL || CONFIG.host || 'http://localhost:3000';
const yelpSearch = require('./lib/yelp');



require('./routes/user-routes')(userRouter, models);


app.use(express.static(__dirname + '/build'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', url);
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.get('/', (req, res) => {
  yelpSearch(req.parameters, (error, response, body) => {
    console.log(response);
    console.log(body);
  });
})

app.use('/', userRouter);


app.listen(port, () => {console.log('port up on '+ port);});
