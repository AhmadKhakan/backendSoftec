const NoteSummary = require('../models/NoteSummary');

// Create Note
exports.createNote = async (req, res) => {
  try {
    const note = new NoteSummary(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await NoteSummary.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const note = await NoteSummary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    await NoteSummary.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
