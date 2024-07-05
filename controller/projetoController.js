

const DAOProjeto = require('../database/DAOProjeto.js')
const { usuarioNome } = require('../helpers/getSessionNome.js')

const getNovo = async (req, res) => {
    res.render('projeto/novo', {user: usuarioNome(req, res), mensagem: ''})
}

module.exports = {
    getNovo,
}


