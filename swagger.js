const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Life Management API',
      version: '1.0.0',
      description: 'API for managing users, tasks, goals, achievements, moods, notifications, and notes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // 👈 your routes with comments
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
