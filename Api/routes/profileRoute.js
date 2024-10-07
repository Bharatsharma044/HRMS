const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.post('/create', profileController.createProfile);
router.get('/getAll', profileController.getAllProfiles);
router.get('/getById', profileController.getProfileById);
router.put('/update', profileController.updateProfile);
router.delete('/delete', profileController.deleteProfile);
router.get('/search', profileController.searchProfiles);  // Search route
router.delete('/multiDelete', profileController.multiDeleteProfiles);  // Multi-delete route

module.exports = router;
