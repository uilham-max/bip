const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Projeto = require('./Projeto');

const Etapa = conexao.define('etapa', {
  descricao: Sequelize.STRING,
  dataInicio: Sequelize.DATEONLY,
  dataFim: Sequelize.DATEONLY,
  titulo: Sequelize.STRING,
  projetoId: {
    type: Sequelize.INTEGER,
    references: {
      model: Projeto,
      key: 'id',
    },
  },
});

module.exports = Etapa;
