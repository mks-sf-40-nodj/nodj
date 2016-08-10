'use strict';
const getYelp = require('../models/restaurant');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');

exports.post = (req, res) => {
  let restaurant = req.body.restaurant, 
      city = req.body.city, 
      coordinate = req.body.coordinate;
  // Create key based on request body to use for caching
  let key = JSON.stringify(req.body);

  redis.del(key);

  /*
   * Check if redis has a sesson stored
   * return data if session exist.
  */
  redis.get(key, (err, result) => {

    res.setHeader('Content-Type', 'application/json');

    if (result) {
      // console.log('return from redis');
      res.send(JSON.parse(result));
      res.end();
    } else {
      // console.log('api');
      getYelp(restaurant, city, coordinate)(res)
        .then((data) => {
          // console.log('data: ', data);
          // Cache data using request body as key
          redis.set(key, JSON.stringify(data.data));
          // Set cache to expire in an hour
          redis.expire(key, 3600);
          return data.respond;
          res.end();
        });
    }
  });
};
