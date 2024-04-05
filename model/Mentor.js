const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Mentor = conexao.define('mentor', {
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  senha: Sequelize.STRING,
  cpf: Sequelize.STRING,
  endereco: Sequelize.STRING,
  areaConhecimento: Sequelize.STRING,
});

module.exports = Mentor;
