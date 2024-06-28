const express = require('express');
const router = express.Router();

const propostaController = require('../controller/propostaController');

router.get('/novo/:problemaId', propostaController.getNovo);
router.post('/novo', propostaController.postNovo);

module.exports = router;
