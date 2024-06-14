const express = require('express');
const router = express.Router();
const mentorController = require('../controller/mentorController');

router.get('/', mentorController.home)


module.exports = router;