'use strict';
const jwtAuth = require('../lib/auth.js');

const UserController = require('../controllers/user-controller');
module.exports = (userRouter, models) => {


  userRouter.route('/signup')
    .post((req, res) => { UserController.signUp(req, res); });



  userRouter.get('/users', (req, res) => { UserController.getAllUsers(req, res); });


  userRouter.route('/users/:id')
    .get(jwtAuth, (req, res)    => { UserController.getOneUser(req, res); })
    .put(jwtAuth, (req, res)    => { UserController.updateUser(req, res); })
    .delete(jwtAuth, (req, res) => { UserController.deleteUser(req, res); });


  userRouter.route('/users/:id/bookings')
    .get(jwtAuth, (req, res)    => { UserController.getUserBookings(req, res); })
    .post(jwtAuth, (req, res)   => { UserController.make_a_booking(req, res); });


  userRouter.route('/users/:id/bookings/:company')
    .delete(jwtAuth, (req, res) => { UserController.delete_a_booking(req, res); });




};
