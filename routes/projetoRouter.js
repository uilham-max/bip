const express = require('express')
const router = express.Router()
const projetoController = require('../controller/projetoController')

router.get('/novo/:propostaId', projetoController.getNovo)
router.post('/novo', projetoController.postNovo)

module.exports = router


