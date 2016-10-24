'use strict';
const jwtAuth = require('../lib/auth.js');
const BookingController = require('../controllers/booking-controller');

module.exports = (bookingRouter, models) => {


  bookingRouter.get('/bookings', (req, res) => {
    BookingController.getAllBookings(req, res);
  });


};
