const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  target_date: { type: Date },
  status: { type: String, enum: ['active', 'completed', 'abandoned'], default: 'active' },
  created_at: { type: Date, default: Date.now },
  completed_at: { type: Date }
});

module.exports = mongoose.model('Goal', GoalSchema);
