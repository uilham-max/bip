const express = require('express');
const router = express.Router();

const problemaController = require('../controller/problemaController');

router.get('/novo', problemaController.getNovo);
module.exports = router;
