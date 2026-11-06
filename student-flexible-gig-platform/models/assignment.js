const mongoose = require('mongoose');
const assignmentSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  selectedApplications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  assignedAt: { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = mongoose.model('Assignment', assignmentSchema);