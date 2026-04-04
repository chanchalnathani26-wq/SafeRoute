const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phone:  { type: String, required: true, unique: true },
  name:   String,
  emergencyContacts: [{ name: String, phone: String }],
  distressCode: { type: String, default: '1234' },
  role:   { type: String, enum: ['user', 'guardian'], default: 'user' },
  guardianOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);