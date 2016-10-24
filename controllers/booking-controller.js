'use strict';

const models = require('../models');

const Booking = models.Booking;

let BookingController = {
  getAllBookings: function(req, res) {
    Booking.find({}, (err, bookings) => {
      if(err) throw err;

      res.status(200).json({ bookings });
    });
  }
};

module.exports = BookingController;
