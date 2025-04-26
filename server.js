// // // /server.js
// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const connectDB = require('./config/db');
// // const swaggerUi = require('swagger-ui-express');
// // const swaggerDocument = require('./swagger.json');


// // dotenv.config();
// // connectDB(); // Connect to MongoDB

// // const app = express();
// // app.use(cors());
// // app.use(express.json()); // Parse JSON

// // // Routes
// // app.use('/api/users', require('./routes/userRoutes'));
// // app.use('/api/tasks', require('./routes/taskRoutes'));
// // app.use('/api/goals', require('./routes/goalRoutes'));
// // app.use('/api/achievements', require('./routes/achievementRoutes'));
// // app.use('/api/moods', require('./routes/moodRoutes'));
// // app.use('/api/notifications', require('./routes/notificationRoutes'));
// // app.use('/api/notes', require('./routes/noteRoutes'));

// // const PORT = process.env.PORT || 3001;
// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// // server.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// dotenv.config();
// connectDB(); // Connect to MongoDB

// const app = express();
// app.use(cors());
// app.use(express.json()); // Parse JSON

// // Routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/tasks', require('./routes/taskRoutes'));
// app.use('/api/goals', require('./routes/goalRoutes'));
// app.use('/api/achievements', require('./routes/achievementRoutes'));
// app.use('/api/moods', require('./routes/moodRoutes'));
// app.use('/api/notifications', require('./routes/notificationRoutes'));
// app.use('/api/notes', require('./routes/noteRoutes'));

// // ✅ Swagger Docs mounted before app.listen
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { GoogleGenAI } = require('@google/genai');

const GEMINI_API_KEY =process.env.GEMINI_API_KEY;
//console.log('GEMINI_API_KEY:', GEMINI_API_KEY);     // Log the API key for debugging

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
console.log(process.env)

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/goals', require('./routes/goalRoutes'));
app.use('/achievements', require('./routes/achievementRoutes'));
app.use('/moods', require('./routes/moodRoutes'));
app.use('/notifications', require('./routes/notificationRoutes'));
app.use('/notes', require('./routes/noteRoutes'));

// ✅ Swagger Docs mounted before app.listen
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
async function main() {
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
  
  const description = "Plan my sister's birthday party by May 15. Its very urgent . ";
const finalPromptforTaskCreation = `${promptforCreatingaTask} ${description}`;  



  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: [{ role: 'user', parts: [{ text: finalPromptforTaskCreation }] }],
  });
  console.log(response.text);
}

async function noteSummarizer() {
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
}
//main();
//noteSummarizer(); 
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
