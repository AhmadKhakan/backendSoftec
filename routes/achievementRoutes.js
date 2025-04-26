const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

router.post('/', achievementController.createAchievement);
router.get('/', achievementController.getAchievements);
router.put('/:id', achievementController.updateAchievement);
router.delete('/:id', achievementController.deleteAchievement);

module.exports = router;
