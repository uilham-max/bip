const express = require('express')
const router = express.Router()

const estudanteController = require("../controller/estudanteController")

router.get('/novo', estudanteController.getNovoEstudante)
router.post('/novo', estudanteController.postNovoEstudante)
// router.get('/login', estudanteController.getLogin)
// router.post('/login', estudanteController.postLogin)
// router.get('/logout', estudanteController.getLogout)

module.exports = router

