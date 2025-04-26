const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['task_completion', 'goal_completion', 'streak'], required: true },
  related_goal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', default: null },
  related_task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  description: { type: String },
  date_earned: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', AchievementSchema);
