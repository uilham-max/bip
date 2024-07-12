const express = require('express');
const router = express.Router();

const problemaController = require('../controller/problemaController');
const {demandanteAutorizacao} = require('../autorizacao/auth');

router.get('/novo', demandanteAutorizacao, problemaController.getNovo);
router.post('/novo', demandanteAutorizacao, problemaController.postNovo);
router.get('/lista', problemaController.getLista);
router.get('/detalhe/:problemaId?', problemaController.getDetalhe);
router.get('/desativar/:problemaId?', problemaController.getDesativar);

module.exports = router;
