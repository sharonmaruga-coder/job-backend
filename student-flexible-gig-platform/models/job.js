const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  workersNeeded: { type: Number, default: 1 },
  workersSelected: { type: Number, default: 0 },
  status: { type: String, enum: ['open','assigned','closed'], default: 'open' },
  location: String
}, { timestamps: true });
module.exports = mongoose.model('Job', jobSchema);