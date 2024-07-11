const express = require('express');
const router = express.Router();

const controller = require('../controller/mentorController');

router.post('/cadastrar', controller.CadastrarNovoMentor);
router.post('/login', controller.RealizarLogin);

router.get('/login', controller.RenderLogin);
router.get('/novo', controller.RenderCadastro);
router.get('/listar', controller.ListarTodosMentor);

module.exports = router;