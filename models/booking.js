'use strict';

module.exports = (mongoose, models) => {
  let Schema = mongoose.Schema;
  const bookingSchema = new mongoose.Schema({
    attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
    company: String
  });

  const Booking = mongoose.model('Booking', bookingSchema);
  models.Booking = Booking;
};
