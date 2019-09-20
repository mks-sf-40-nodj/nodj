const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const lusca = require('lusca');
const expressValidator = require('express-validator');
const fs = require('fs');

/*
** Load local environment variables from .env 
** file where secrets and keys are configured.
*/


if (fs.existsSync('.env')) { 
  let dotenv;
  dotenv = require('dotenv');
  dotenv.load({ path: '.env' });
} 

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  })
}));

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('Session failed!'));
  }
  next();
});

app.use(lusca({
  csrf: {
    cookie: '_csrf'
  },
  xframe: 'SAMEORIGIN',
  xssProtection: true,
  nosniff: true
}));

app.use((req, res, next) => {
  if (req.path === '/') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});

/*
** Route Controllers
*/

const getRestaurant = require('./controllers/getRestaurant');
const getJob = require('./controllers/getJob');
const getPlace = require('./controllers/getPlace');
const scrapDetail = require('./controllers/scrapDetail');

app.use(express.static(path.join(__dirname, '../public')));

/*
** App routes.
*/

app.post('/api/v1/jobs', getJob.post);
app.post('/api/v1/food', getRestaurant.post);
app.post('/api/v1/places', getPlace.post);
app.post('/api/v1/scrap', scrapDetail.post);

app.get('/results', function(req, res) {
  res.redirect('/');
  res.end();
});

module.exports = app;
