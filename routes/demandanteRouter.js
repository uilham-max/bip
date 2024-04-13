const express = require('express')
const router = express.Router()

const demandanteController = require("../controller/demandanteController")

router.post('/novo', demandanteController.postCriarDemandante)

module.exports = router

