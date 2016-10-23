'use strict';
const jwtAuth = require('../lib/auth.js');


module.exports = (bookingRouter, models) => {
  const User    = models.User;
  const Booking = models.Booking;

  bookingRouter.route('/bookings')
    .get((req, res) => {
      Booking.find({}, (err, bookings) => {
        if(err) throw err;

        res.status(200).json({ bookings });
      });
    });




};
