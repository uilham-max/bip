const express = require('express');
const router = express.Router();

const propostaController = require('../controller/propostaController');

router.get('/novo/:problemaId', propostaController.getNovo);
router.post('/novo', propostaController.postNovo);
router.get('/detalhe/:propostaId', propostaController.getDetalhe)

module.exports = router;
