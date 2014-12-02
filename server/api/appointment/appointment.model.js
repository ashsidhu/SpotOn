'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
  dueDate: { type: Date, required: true },
  updated: { type: Date, default: Date.now },
  _userId: Schema.Types.ObjectId,
  _businessId: Schema.Types.ObjectId,
  message: String,
  rating: Number,
  status: String
});

module.exports = mongoose.model('Appointment', AppointmentSchema);