const Sequelize = require('sequelize')
const conexao = require('../database/conexao')

const Demandante = conexao.define('demandante', {
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    senha: Sequelize.STRING,
    cpf: Sequelize.STRING,
    endereco: Sequelize.STRING,
})

// conexao.sync({force: false})

module.exports = Demandante