const express = require('express');
const router = express.Router();

const controller = require('../controller/mentorController');

router.post('/cadastrar', controller.CadastrarNovoMentor);

router.get('/novo', controller.RenderCadastro);
router.get('/listar', controller.ListarTodosMentor);

module.exports = router;