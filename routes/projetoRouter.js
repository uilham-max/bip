const express = require('express')
const router = express.Router()
const projetoController = require('../controller/projetoController')

router.get('/novo/:propostaId', projetoController.getNovo)

module.exports = router


