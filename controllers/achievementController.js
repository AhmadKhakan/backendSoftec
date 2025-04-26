const Achievement = require('../models/Achievement');

// Create Achievement
exports.createAchievement = async (req, res) => {
  try {
    const { user_id, type, related_goal_id, related_task_id, description } = req.body;

    // Validate required fields
    if (!user_id || !type) {
      return res.status(400).json({ error: 'User ID and Achievement type are required.' });
    }

    const achievement = new Achievement({
      user_id,
      type,
      related_goal_id: related_goal_id || null,
      related_task_id: related_task_id || null,
      description,
    });

    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().populate('user_id').populate('related_goal_id').populate('related_task_id');
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Achievement
exports.updateAchievement = async (req, res) => {
  try {
    const { user_id, type, related_goal_id, related_task_id, description } = req.body;

    // Validate required fields
    if (!user_id || !type) {
      return res.status(400).json({ error: 'User ID and Achievement type are required.' });
    }

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      {
        user_id,
        type,
        related_goal_id: related_goal_id || null,
        related_task_id: related_task_id || null,
        description,
      },
      { new: true }
    );

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found.' });
    }

    res.json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found.' });
    }

    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
