const Achievement = require('../models/Achievement');

// Create Achievement
exports.createAchievement = async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Achievement
exports.updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Achievement
exports.deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
