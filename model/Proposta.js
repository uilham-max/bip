const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Estudante = require('./Estudante');
const Problema = require('./Problema');

const Proposta = conexao.define('proposta', {
  titulo: Sequelize.STRING,
  descricao: Sequelize.STRING,
  dataSubmissao: Sequelize.DATEONLY,
  areaConhecimento: Sequelize.STRING,
  problemaId: {
    type: Sequelize.INTEGER,
    references: {
      model: Problema,
      key: 'id',
    },
  },
  estudanteId: {
    type: Sequelize.INTEGER,
    references: {
      model: Estudante,
      key: 'id',
    },
  },
});

module.exports = Proposta;
