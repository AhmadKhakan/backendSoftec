const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  type: { type: String, enum: ['reminder', 'system_message'], required: true },
  message: { type: String },
  trigger_time: { type: Date },
  read_status: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);
