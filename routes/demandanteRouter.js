const express = require('express')
const router = express.Router()

const demandanteController = require("../controller/demandanteController")

router.post('/insert', demandanteController.insert)

module.exports = router




