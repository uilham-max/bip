const express = require('express')
const DAOProblema = require('../database/DAOProblema')
const { usuarioNome } = require('../helpers/getSessionNome')

const getNovo = async (req, res) => {
    res.render('problema/novo', {user: usuarioNome(req, res), mensagem:''})
}

module.exports = {
    getNovo,
}