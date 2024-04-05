const Sequelize = require('sequelize');

const conexao = new Sequelize('bip_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgresql',
  timezone: '-03:00',
  define: {
    freezeTableName: true,
  },
});

module.exports = conexao;
