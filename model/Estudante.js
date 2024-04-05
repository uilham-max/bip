const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Estudante = conexao.define('estudante', {
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  senha: Sequelize.STRING,
  cpf: Sequelize.STRING,
  endereco: Sequelize.STRING,
  curso: Sequelize.STRING,
  semestre: Sequelize.INTEGER,
  matricula: Sequelize.STRING,
});

module.exports = Estudante;
