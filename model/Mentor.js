const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Mentor = conexao.define('mentor', {
  nome: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  senha: Sequelize.STRING,
  cpf: Sequelize.STRING,
  endereco: Sequelize.STRING,
  areaConhecimento: Sequelize.STRING,
});

module.exports = Mentor;
