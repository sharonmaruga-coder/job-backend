const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  employeeName: { type: String, required: true },
  employeePhone: String,
  status: { type: String, enum: ['pending','selected','rejected'], default: 'pending' }
}, { timestamps: true });
module.exports = mongoose.model('Application', applicationSchema);