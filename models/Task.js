const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', default: null },
  parent_task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  title: { type: String, required: true },
  description: { type: String },
  due_date: { type: Date },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  status: { type: String, enum: ['pending', 'completed', 'missed'], default: 'pending' },
  category: { type: String },
  created_at: { type: Date, default: Date.now },
  completed_at: { type: Date },
  updated_at: { type: Date },
  checklist_items: [{ type: String }],
  mood_tag: { type: mongoose.Schema.Types.ObjectId, ref: 'MoodEntry', default: null }
});

module.exports = mongoose.model('Task', TaskSchema);
