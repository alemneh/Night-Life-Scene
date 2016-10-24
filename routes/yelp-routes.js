'use strict';
const jwtAuth = require('../lib/auth.js');
const yelpSearch = require('../controllers/yelp-controller');

module.exports = (yelpRouter, models) => {


  yelpRouter.post('/yelp-search', (req, res) => {
    yelpSearch(req.body, (error, response, body) => {
      body = JSON.parse(body);
      res.status(200).json({
        businesses: body.businesses
      });
    });
  });


};
