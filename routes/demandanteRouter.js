const express = require('express')
const router = express.Router()

const demandanteController = require("../controller/demandanteController")

router.post('/novo', demandanteController.postCriarDemandante)
router.get('/lista', demandanteController.getListarDemandates)
// router.get('/login', demandanteController.getLogin)
router.post('/login', demandanteController.postLogin)


module.exports = router

