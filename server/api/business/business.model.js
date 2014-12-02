'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BusinessSchema = new Schema({
  name: String,
  info: String,
  _appointmentIds: [Schema.Types.ObjectId],
  _ownerId: Schema.Types.ObjectId,
  active: Boolean
});

// get appointments for business
// get owner info for business

module.exports = mongoose.model('Business', BusinessSchema);