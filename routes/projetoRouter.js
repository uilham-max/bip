const express = require('express');
const router = express.Router();
const projetoController = require('../controller/projetoController');
const {mentorAutorizacao} = require('../autorizacao/auth');

router.get('/novo/:propostaId?', mentorAutorizacao, projetoController.getNovo);
router.post('/novo', mentorAutorizacao, projetoController.postNovo);

module.exports = router;
