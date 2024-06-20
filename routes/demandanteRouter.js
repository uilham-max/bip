const express = require('express')
const router = express.Router()

const demandanteController = require("../controller/demandanteController")

router.get('/novo', demandanteController.getNovoDemandante)
router.post('/novo', demandanteController.postNovoDemandante)
router.get('/login', demandanteController.getLogin)
router.post('/login', demandanteController.postLogin)
router.get('/logout', demandanteController.getLogout)

module.exports = router

