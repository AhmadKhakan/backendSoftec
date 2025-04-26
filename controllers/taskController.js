// /controllers/taskController.js
const Task = require('../models/Task');
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
function parseTaskJson(jsonText) {
  // Extract the JSON content from within the code block
  const jsonRegex = /```json\n([\s\S]*?)\n```/;
  const match = jsonText.match(jsonRegex);
  
  if (!match || !match[1]) {
    throw new Error("No valid JSON found in the provided text");
  }
  
  try {
    // Parse the extracted JSON string
    const taskObject = JSON.parse(match[1]);
    
    // Remove duplicates from checklist_items if any exist
    if (taskObject.checklist_items && Array.isArray(taskObject.checklist_items)) {
      taskObject.checklist_items = [...new Set(taskObject.checklist_items)];
    }
    
    return taskObject;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
}
const GEMINI_API_KEY =process.env.GEMINI_API_KEY;
//console.log('GEMINI_API_KEY:', GEMINI_API_KEY);     // Log the API key for debugging

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Create Task
// ai wali  text 
exports.createTaskAI = async (req, res) => {
  
    const promptforCreatingaTask = `
    You are a helpful assistant that generates a Task JSON object based on a user’s text description.
    
    Task JSON Model:  
    - user_id: ObjectId string (required)  
    - goal_id: ObjectId string (optional, default null)  
    - parent_task_id: ObjectId string (optional, default null)  
    - title: Short title of the task (required)  
    - description: Detailed description (optional)  
    - due_date: ISO date string (optional)  
    - priority: "high", "medium", or "low" (default "medium")  
    - status: "pending", "completed", or "missed" (default "pending")  
    - category: Category string (optional)  
    - created_at: ISO date string (default: now)  
    - completed_at: ISO date string (optional)  
    - updated_at: ISO date string (optional)  
    - checklist_items: Array of strings (optional)  
    - mood_tag: ObjectId string (optional, default null)
    
    Instructions:  
    - Parse the user's description carefully.  
    - Fill in all relevant fields.  
    - If information is missing, use defaults or set the field to null.  
    - Divide the task into smaller steps and add them to the checklist_items array.
    - Always output only the JSON object, no extra explanation.
    - Set placeholders like "USER_OBJECT_ID" where real IDs are required.
    
    Use the following user input to generate the JSON.
    `;
    
  const description = req.body.description; // User's description from the request body
  console.log('User description:', description); // Log the user's description for debugging
  const finalPromptforTaskCreation = `${promptforCreatingaTask} ${description}`;  
  
  
  
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: [{ role: 'user', parts: [{ text: finalPromptforTaskCreation }] }],
    });
    console.log(response.text);

    res.status(201).json(parseTaskJson(response.text)); // Send the generated task data as a response
    
}



exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
