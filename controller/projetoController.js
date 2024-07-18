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
  let projetos = await DAOProjeto.getAll()
  if(!projetos){
    return res.render('projeto/lista', {user: usuarioNome(req, res), projetos: projetos, mensagem: 'Erro ao listar Projetos.'})
  }
  return res.render('projeto/lista', {user: usuarioNome(req, res), projetos: projetos, mensagem: ''})
};


const getLista = async (req, res) => {
  let projetos = await DAOProjeto.getAll()
  console.log(projetos);
  if(!projetos){
    return res.render('projeto/lista', {user: usuarioNome(req, res), projetos: projetos, mensagem: 'Erro ao listar Projetos.'})
  }
  return res.render('projeto/lista', {user: usuarioNome(req, res), projetos: projetos, mensagem: ''})
}

module.exports = {
  getNovo,
  postNovo,
  getLista,
};
