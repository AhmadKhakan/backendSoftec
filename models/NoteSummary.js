const mongoose = require('mongoose');

const NoteSummarySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  original_text: { type: String },
  summary_bullets: [{ type: String }],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NoteSummary', NoteSummarySchema);
