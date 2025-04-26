const Goal = require('../models/Goal');

// Create Goal
exports.createGoal = async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Goal By ID
exports.getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.json(goal);
  } catch (error) {
    res.status(404).json({ error: "Goal not found" });
  }
};

// Update Goal
exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Goal
exports.deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
