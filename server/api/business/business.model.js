'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BusinessSchema = new Schema({
  name: String,
  info: String,
  _appointmentIds: [Schema.Types.ObjectId],
  owner: Schema.Types.ObjectId,
  defaultDuration: Number,
  active: Boolean
});

// get appointments for business
// get owner info for business

module.exports = mongoose.model('Business', BusinessSchema);