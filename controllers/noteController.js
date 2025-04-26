const NoteSummary = require('../models/NoteSummary');
const { GoogleGenAI } = require('@google/genai');
/**
 * Parses JSON text from LLM responses with improved error handling
 * 
 * Handles common issues like:
 * - Code block markers (```json, ```)
 * - Multiple code blocks in one response
 * - Extra text before or after the JSON content
 * - Common formatting issues
 * 
 * @param {string} responseString - The raw text from an LLM response
 * @returns {object|null} - Parsed JSON object or null if parsing fails
 */
function parseNoteJson(jsonText) {
  // Extract the JSON content from within the code block
  const jsonRegex = /```json\n([\s\S]*?)\n```/;
  const match = jsonText.match(jsonRegex);
  
  if (!match || !match[1]) {
    throw new Error("No valid JSON found in the provided text");
  }
  
  try {
    // Parse the extracted JSON string
    const NoteObject = JSON.parse(match[1]);
    
    // Remove duplicates from checklist_items if any exist
    if (NoteObject.summary_bullets && Array.isArray(NoteObject.summary_bullets)) {
      NoteObject.summary_bullets = [...new Set(NoteObject.summary_bullets)];
    }
    
    return NoteObject;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
}
const GEMINI_API_KEY =process.env.GEMINI_API_KEY;
//console.log('GEMINI_API_KEY:', GEMINI_API_KEY);     // Log the API key for debugging

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

exports.createNoteAI = async (req, res) => {

  const prompt = `
  You are a helpful assistant that generates a NoteSummary JSON object based on a user's original text.
  
  NoteSummary JSON Model:  
  - user_id: ObjectId string (required)  
  - original_text: The original full text (string)  
  - summary_bullets: An array of important bullet points (array of strings)  
  - created_at: ISO date string (default: now)
  
  Instructions:  
  - Carefully read the original_text.
  - Extract the key points into short, clear bullet points.
  - Output only the JSON object, no extra explanation.
  - Use "USER_OBJECT_ID" as the user_id placeholder if needed.
  `;
  
  const description = "Today I attended a seminar on AI advancements. The speaker discussed new breakthroughs in machine learning and how AI is impacting healthcare and education. They emphasized ethical considerations and the importance of data privacy.";
  
const finalPromptforNoteSummarization = `${prompt} ${description}`;



  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: [{ role: 'user', parts: [{ text: finalPromptforNoteSummarization }] }],
  });
  console.log(response.text);
  res.status(201).json(parseNoteJson(response.text));
}

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
