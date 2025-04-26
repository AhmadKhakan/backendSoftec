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

//main();
//noteSummarizer(); 
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
