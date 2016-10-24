'use strict';

const models = require('../models');

const Booking = models.Booking;
const User = models.User;

let UserController = {

  signUp: function(req, res) {
    User.findOne({name: req.body.name}, (err, user) => {
      if(err) throw err;
      if(!user) {
        var newUser = new User(req.body);
        newUser.save((err, user) => {
          res.json({
            data: user,
            token: user.generateToken()
          });
        });
      } else {
        res.status(401).json({error: 'Username taken!'});
      }
    });
  },

  getAllUsers: function(req, res) {
    User.find({}, (err, users) => {
      if(err) throw err;
      res.status(200).json({ users });
    });
  },

  getOneUser: function(req, res) {
    User.findOne({_id:req.params.id}, (err, user) => {
      if(err) throw err;
      res.json({data: user});
    });
  },

  updateUser: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if(err) throw err;
      res.json({message: 'Update successful!'});
    });
  },

  getUserBookings: function(req, res) {
    User.findOne({_id: req.params.id})
      .populate('placesAttending')
      .exec((err, user) => {
        if(err) throw err;
        res.status(200).json({data: user.placesAttending});
      });
  },

  make_a_booking: function(req, res) {
    let bookingCopy;

    Booking.findOne({company: req.body.company}).exec()

    .then((booking) => {

      if(booking) {
        if(booking.attendees.indexOf(req.params.id) != -1) {
          res.status(200).json({message: 'already attending!'});
          console.log('aborted promise');
          throw new Error('User id already exsit');
        }
        booking.attendees.push(req.params.id);
        booking.save();
        bookingCopy = booking;
        return User.findById(req.params.id).exec();
      } else {
        let newBooking = new Booking(req.body);
        newBooking.attendees.push(req.params.id);
        newBooking.save();
        bookingCopy = newBooking;
        return User.findById(req.params.id).exec();
      }

    })
    .then((user) => {
      user.placesAttending.push(bookingCopy._id);
      return user.save();
    })
    .then((user) => {
      res.status(200).json({message: 'Booking made!'});
    })
    .catch((err) => {
      if(err.message == 'User id already exsit') {
        // abort promise chain
      } else {
        throw err;
      }
    });
  },

  delete_a_booking: function(req, res) {
    Booking.findOneAndUpdate({company: req.params.company}, {$pull: {attendees: req.params.id}}).exec()

    .then((booking) => {
      return User.findByIdAndUpdate(req.params.id, {$pull: {placesAttending: booking._id}}).exec();
    })
    .then((user) => {
      res.json({message: 'Unbooked booking!'});
    })
    .catch((err) => {
      throw err;
    });
  }

};

module.exports = UserController;
