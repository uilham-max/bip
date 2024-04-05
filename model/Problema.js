const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Demandante = require('./Demandante');

const Problema = conexao.define('problema', {
  descricao: Sequelize.STRING,
  dataSubmissao: Sequelize.DATEONLY,
  titulo: Sequelize.STRING,
  demandanteId: {
    type: Sequelize.INTEGER,
    references: {
      model: Demandante,
      key: 'id',
    },
  },
});

module.exports = Problema;
