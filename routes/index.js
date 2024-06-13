var express = require('express');
var router = express.Router();
var { demandanteNome } = require('../helpers/getSessionNome')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: demandanteNome(req, res), mensagem: ''})
});

router.get('/tipoUsuario', (req, res) => {
  res.render('tipoUsuario', {user: demandanteNome(req, res),mensagem: ""})
})

router.get('/tipoUsuarioLogin', (req, res) => {
  res.render('tipoUsuarioLogin', {user: demandanteNome(req, res),mensagem: ""})
})

module.exports = router;
