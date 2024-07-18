const DAOProjeto = require('../database/DAOProjeto.js');
const DAOProposta = require('../database/DAOProposta.js');
const {usuarioNome} = require('../helpers/getSessionNome.js');

const getNovo = async (req, res) => {
  let propostaId = req.query.propostaId;
  let proposta = await DAOProposta.getOne(propostaId);
  console.log("teste");
  res.render('projeto/novo', {user: usuarioNome(req, res), proposta: proposta, mensagem: ''});
};

const postNovo = async (req, res) => {
  let {titulo, descricao, dataInicio, dataFim, insumo, custoTotal, propostaId, mentorId} = req.body
  console.log(titulo, descricao, dataInicio, dataFim, insumo, custoTotal, propostaId, mentorId);
  let insert = DAOProjeto.insert(titulo, descricao, dataInicio, dataFim, insumo, custoTotal, propostaId, mentorId)
  if(!insert){
    return res.render('projeto/novo', {user: usuarioNome(req, res), mensagem: 'Erro ao iniciar Projeto.'})
  }
  return res.render('projeto/novo', {user: usuarioNome(req, res), propostaId: 0, mensagem: 'Projeto iniciado com sucesso!'})
};

module.exports = {
  getNovo,
  postNovo,
};
