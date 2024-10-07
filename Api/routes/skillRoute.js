const express = require('express');
const router = express.Router();
const skillController = require('../controller/skillController');

// Create a new skill
router.post('/create', skillController.createSkill);

// Get all skills
router.get('/getAll', skillController.getAllSkills);

// Get a single skill by ID
router.get('/getById', skillController.getSkillById);

// Update a skill by ID
router.put('/update', skillController.updateSkill);

// Delete a skill by ID
router.delete('/delete', skillController.deleteSkill);

// Multi-delete skills
router.delete('/multiDelete', skillController.multiDeleteSkills);

//search
router.get('/search', skillController.searchSkills);

module.exports = router;
