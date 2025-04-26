const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood_level: { type: Number, min: 1, max: 10 },
  mood_category: { type: String },
  journal_entry: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
