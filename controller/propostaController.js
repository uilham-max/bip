const DAOProposta = require('../database/DAOProposta');
const DAOEstudate = require('../database/DAOEstudante');

const {usuarioNome} = require('../helpers/getSessionNome');
const moment = require('moment-timezone');

const getNovo = async (req, res) => {
  let problemaId = req.params.problemaId;
  // console.log("Usuário da session:\n",req.session.usuario);
  res.render('proposta/novo', {user: usuarioNome(req, res), problemaId: problemaId, mensagem: ''});
};

const postNovo = async (req, res) => {
  let = {titulo, descricao, areaConhecimento, problemaId} = req.body;
  let estudanteId = null ? req.session.usuario.id : 1;
  let dataSubmissao = moment.tz(new Date(), 'America/Sao_Paulo').format('YYYY-MM-DD');
  console.log('Tentando enviar proposta:\n', req.body.descricao, 'Estudante: ', estudanteId, 'Data:', dataSubmissao);

  let insert = await DAOProposta.insert(titulo, descricao, dataSubmissao, areaConhecimento, problemaId, estudanteId);
  if (!insert) {
    res.render('proposta/novo', {
      user: usuarioNome(req, res),
      mensagem: 'Erro ao enviar problema.',
    });
  }
  res.render('proposta/novo', {
    user: usuarioNome(req, res),
    mensagem: 'Seu problema foi enviado com sucesso!',
  });
};

const getDetalhe = async (req, res) => {
  let propostaId = req.params.propostaId;
  let proposta = await DAOProposta.getOne(propostaId);
  console.log(proposta);
  //let estudante = await DAOEstudate.getOne(proposta.dataValues.estudanteId);
  //if (!estudante) {
  //  res.render('erro', {mensagem: 'Erro ao busca estudante'});
  //  return;
  //}
  if (!proposta) {
    res.render('erro', {mensagem: 'Erro ao busca proposta'});
    return;
  }
  res.render('proposta/detalhe', {user: usuarioNome(req, res), proposta: proposta, mensagem: ''});
};

module.exports = {
  getNovo,
  postNovo,
  getDetalhe,
};
