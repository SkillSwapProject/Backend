const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  hoursRequired: { type: Number, required: true },
  status: { type: String, enum: ['available', 'unavailable'], default: 'available' }
});

module.exports = mongoose.model('Service', serviceSchema);
