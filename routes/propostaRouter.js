const express = require('express');
const router = express.Router();

const propostaController = require('../controller/propostaController');
const {estudanteAutorizacao} = require('../autorizacao/auth');

router.get('/novo/:problemaId', estudanteAutorizacao, propostaController.getNovo);
router.post('/novo', estudanteAutorizacao, propostaController.postNovo);
router.get('/detalhe/:propostaId', propostaController.getDetalhe);

module.exports = router;
