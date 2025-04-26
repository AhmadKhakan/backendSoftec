const MoodEntry = require('../models/MoodEntry');

// Create Mood Entry
exports.createMood = async (req, res) => {
  try {
    const mood = new MoodEntry(req.body);
    await mood.save();
    res.status(201).json(mood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Mood Entries
exports.getMoods = async (req, res) => {
  try {
    const moods = await MoodEntry.find();
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Mood
exports.updateMood = async (req, res) => {
  try {
    const mood = await MoodEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Mood
exports.deleteMood = async (req, res) => {
  try {
    await MoodEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Mood entry deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
