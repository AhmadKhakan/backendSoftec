// const express = require('express');
// const router = express.Router();
// const achievementController = require('../controllers/achievementController');

// router.post('/', achievementController.createAchievement);
// router.get('/', achievementController.getAchievements);
// router.put('/:id', achievementController.updateAchievement);
// router.delete('/:id', achievementController.deleteAchievement);

// module.exports = router;

const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Achievement:
 *       type: object
 *       required:
 *         - user_id
 *         - type
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID of the user who earned the achievement
 *         type:
 *           type: string
 *           enum: [task_completion, goal_completion, streak]
 *           description: Type of the achievement
 *         related_goal_id:
 *           type: string
 *           description: ID of the related goal (optional)
 *         related_task_id:
 *           type: string
 *           description: ID of the related task (optional)
 *         description:
 *           type: string
 *           description: Description of the achievement
 *         date_earned:
 *           type: string
 *           format: date-time
 *           description: Date when the achievement was earned
 */

/**
 * @swagger
 * /achievements:
 *   post:
 *     summary: Create a new achievement
 *     tags: [Achievements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Achievement'
 *     responses:
 *       201:
 *         description: Achievement created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', achievementController.createAchievement);

/**
 * @swagger
 * /achievements:
 *   get:
 *     summary: Get all achievements
 *     tags: [Achievements]
 *     responses:
 *       200:
 *         description: List of achievements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Achievement'
 *       500:
 *         description: Server error
 */
router.get('/', achievementController.getAchievements);

/**
 * @swagger
 * /achievements/{id}:
 *   put:
 *     summary: Update an achievement by ID
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Achievement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Achievement'
 *     responses:
 *       200:
 *         description: Achievement updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/:id', achievementController.updateAchievement);

/**
 * @swagger
 * /achievements/{id}:
 *   delete:
 *     summary: Delete an achievement by ID
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Achievement ID
 *     responses:
 *       200:
 *         description: Achievement deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete('/:id', achievementController.deleteAchievement);

module.exports = router;
