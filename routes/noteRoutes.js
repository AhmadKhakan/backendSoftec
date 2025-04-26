const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.post('/ai', noteController.createNoteAI); // AI Task Creation
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;




 