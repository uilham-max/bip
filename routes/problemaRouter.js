const express = require('express');
const router = express.Router();

const problemaController = require('../controller/problemaController');

router.get('/novo', problemaController.getNovo);
router.post('/novo', problemaController.postNovo);
router.get('/lista', problemaController.getLista);
router.get('/detalhe/:problemaId?', problemaController.getDetalhe);

module.exports = router;
