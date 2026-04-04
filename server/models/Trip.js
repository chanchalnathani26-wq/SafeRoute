const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mode:          { type: String, enum: ['bus', 'auto', 'cab'] },
  startLocation: { lat: Number, lng: Number },
  endLocation:   { lat: Number, lng: Number },
  route:         [{ lat: Number, lng: Number, timestamp: Date }],
  status:        { type: String, enum: ['active', 'completed', 'sos'], default: 'active' },
  driverId:      String,
  checkIns:      [{ timestamp: Date, location: { lat: Number, lng: Number } }],
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);