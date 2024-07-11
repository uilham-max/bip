const Sequelize = require('sequelize');
const conexao = require('../database/conexao');

const Mentor = require('./Mentor');
const Proposta = require('./Proposta');

const Projeto = conexao.define('projeto', {
  titulo: Sequelize.STRING,
  descricao: Sequelize.TEXT,
  dataInicio: Sequelize.DATEONLY,
  dataFim: Sequelize.DATEONLY,
  insumo: Sequelize.STRING,
  custoTotal: Sequelize.FLOAT,
  propostaId: {
    type: Sequelize.INTEGER,
    references: {
      model: Proposta,
      key: 'id',
    },
  },
  mentorId: {
    type: Sequelize.INTEGER,
    references: {
      model: Mentor,
      key: 'id',
    },
  },
});

module.exports = Projeto;
