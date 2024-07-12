const DAOProjeto = require('../database/DAOProjeto.js');
const DAOProposta = require('../database/DAOProposta.js');
const {usuarioNome} = require('../helpers/getSessionNome.js');

const getNovo = async (req, res) => {
  let propostaId = req.params.propostaId;
  let proposta = await DAOProposta.getOne(propostaId);
  res.render('projeto/novo', {user: usuarioNome(req, res), proposta: proposta, mensagem: ''});
};

const postNovo = async (req, res) => {
  let {titulo, descricao, dataInicio, dataFim, insumo, custoTotal, propostaId, mentorId} = req.body
  let insert = DAOProjeto.insert(titulo, descricao, dataInicio, dataFim, insumo, custoTotal, propostaId, mentorId)
  if(!insert){
    return res.render('erro', {mensagem: 'Erro ao inserir Projeto.'})
  }
  return res.render('projeto/novo', {user: usuarioNome(req, res),mensagem: ''})
};

module.exports = {
  getNovo,
  postNovo,
};
