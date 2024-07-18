const conexao = require('../database/conexao');

const Demandante = require('./Demandante');
const Problema = require('./Problema');
const Estudante = require('./Estudante');
const Proposta = require('./Proposta');
const Projeto = require('./Projeto');
const Mentor = require('./Mentor');
const Etapa = require('./Etapa');

Demandante.hasMany(Problema, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
Problema.belongsTo(Demandante);

Problema.hasMany(Proposta, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
Proposta.belongsTo(Problema);

Estudante.hasMany(Proposta, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
Proposta.belongsTo(Estudante);

// Projeto.hasOne(Proposta);
// Proposta.belongsTo(Projeto);

Mentor.hasMany(Proposta, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
Proposta.belongsTo(Mentor);

Projeto.hasMany(Etapa, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
Etapa.belongsTo(Projeto);

// uilham
  Mentor.hasMany(Projeto, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  Projeto.belongsTo(Mentor);

  Projeto.hasMany(Proposta, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
  Proposta.belongsTo(Projeto);
//
Projeto.belongsToMany(Estudante, {through: 'projeto_estudante'});
Estudante.belongsToMany(Projeto, {through: 'projeto_estudante'});

conexao.sync({force: false});

module.exports = {Demandante, Problema, Estudante, Proposta, Projeto, Mentor, Etapa};
