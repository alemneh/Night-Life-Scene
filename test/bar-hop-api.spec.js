'use strict';
require('../server');
let mongoose = require('mongoose');
let models = require('../models');
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let expect = chai.expect;
let User = models.User;
var token;
var port = 'localhost:3000';
var userId;
var barName;
mongoose.Promise = global.Promise;

describe('Restful API', function() {

  after(function(done) {

    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('Signup/Login routes', function() {

    it('should create a new user', function(done) {
      chai.request(port)
        .post('/signup')
        .send({name: 'alem', password: 'password'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.data.name).to.eql('alem');
          expect(res.body.data).to.have.property('_id');
          done();
        });
    });

    it('should be able to login', function(done) {
      chai.request(port)
        .get('/login')
        .auth('alem', 'password')
        .end((err, res) => {
          token = res.body.token;
          userId = res.body.data._id;
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  }); //signup describe

  describe('User routes', function() {

    it('Should get users', function(done) {
      chai.request(port)
        .get('/users')
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.users[0]._id).to.eql(userId);
          done();
        });
    });

    it('should get one user', function(done) {
      chai.request(port)
        .get('/users/' + userId)
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.data._id).to.eql(userId);
          done();
        });
    });

    it('should update a user', function(done) {
      chai.request(port)
        .put('/users/' + userId)
        .set('token', token)
        .send({name: 'John'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('Update successful!');
          done();
        });
    });

    it('should get all bookings for user', function(done) {
      chai.request(port)
        .get('/users/' + userId + '/bookings')
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.data).to.be.instanceof(Array);
          done();
        });
    });
  });//User routes

  describe('Bookings route', function() {

    it('should make a booking for a user', function(done) {
      chai.request(port)
        .post('/users/' + userId + '/bookings')
        .set('token', token)
        .send({company: 'Bar-Hop'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('Booking made!');
          done();
        });
    });

    it('should delete a booking from a user', function(done) {
      chai.request(port)
        .del('/users/' + userId + '/bookings/Bar-Hop')
        .set('token', token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('Unbooked booking!');
          done();
        });
    });

    it('should get all bookings', function(done) {
      chai.request(port)
        .get('/bookings')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.bookings).to.be.instanceof(Array);
          done();
        });
    });

  });// Booking routes

});// main describe
