const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Estudante = conexao.define('estudante', {
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  senha: Sequelize.STRING,
  cpf: Sequelize.STRING,
  curso: Sequelize.STRING,
  semestre: Sequelize.INTEGER,
  matricula: Sequelize.STRING,
  cep: Sequelize.STRING,
  logradouro: Sequelize.STRING,
  complemento: Sequelize.STRING,
  bairro: Sequelize.STRING,
  localidade: Sequelize.STRING,
  uf: Sequelize.STRING,
  numero_da_casa: Sequelize.INTEGER,
});

module.exports = Estudante;
