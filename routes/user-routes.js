'use strict';
const jwtAuth = require('../lib/auth.js');


module.exports = (userRouter, models) => {
  const User = models.User;
  const Booking = models.Booking;


  userRouter.route('/signup')
    .post((req, res) => {
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
    });


  userRouter.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      if(err) throw err;
      res.status(200).json({ users });
    });
  });

  userRouter.route('/users/:id')
    .get((req, res) => {
      User.findOne({_id:req.params.id}, (err, user) => {
        if(err) throw err;
        res.json({data: user});
      });
    })
    .post((req, res) => {
      let bookingCopy;

      Booking.findOne({company: req.body.company}).exec()

      .then((booking) => {
        if(booking) {
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
        throw err;
      });
    })
    .put((req, res) => {
      User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if(err) throw err;
        res.json({message: 'Update successful!'});
      });
    })
    .delete((req, res) => {
      User.findById(req.params.id, (err, user) => {
        user.polls.forEach((poll) => {
          Poll.findById(poll, (err, data) => {
            if(err) throw err;
            data.remove();
          });
        });
        user.remove((err, user) => {
          if(err) throw err;
          res.json({message: 'User removed!'});
        });
      });
    });



};
