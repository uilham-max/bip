var express = require('express');
var router = express.Router();
var { usuarioNome } = require('../helpers/getSessionNome')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: usuarioNome(req, res), mensagem: ''})
});

router.get('/tipoUsuario', (req, res) => {
  res.render('tipoUsuario', {user: usuarioNome(req, res),mensagem: ""})
})

router.get('/tipoUsuarioLogin', (req, res) => {
  res.render('tipoUsuarioLogin', {user: usuarioNome(req, res),mensagem: ""})
})

module.exports = router;
