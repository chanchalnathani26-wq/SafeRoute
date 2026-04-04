const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tripId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  type:         { type: String, enum: ['sos', 'deviation', 'checkin', 'abnormal'] },
  location:     { lat: Number, lng: Number },
  recordingUrl: String,
  resolved:     { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema);