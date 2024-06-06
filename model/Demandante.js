const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Demandante = conexao.define('demandante', {
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  senha: Sequelize.STRING,
  cpf: Sequelize.STRING,
  cep: Sequelize.STRING,
  logradouro: Sequelize.STRING,
  complemento: Sequelize.STRING,
  bairro: Sequelize.STRING,
  localidade: Sequelize.STRING,
  uf: Sequelize.STRING,
  numero_da_casa: Sequelize.INTEGER,
});

module.exports = Demandante;
