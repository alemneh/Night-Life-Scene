'use strict';
const LoginController = require('../controllers/login-controller');

module.exports = (loginRouter, models) => {

  loginRouter.route('/login')
    .get((req, res) => {
      console.log('login');
      LoginController.logIn(req, res); });

};
