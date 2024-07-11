const DAOProjeto = require('../database/DAOProjeto.js');
const DAOProposta = require('../database/DAOProposta.js');
const {usuarioNome} = require('../helpers/getSessionNome.js');

const getNovo = async (req, res) => {
  let propostaId = req.params.propostaId;
  let proposta = await DAOProposta.getOne(propostaId);

  res.render('projeto/novo', {user: usuarioNome(req, res), proposta: proposta, mensagem: ''});
};

const postNovo = async (req, res) => {
  let projetoId = req.params.projetoId;
  let;
};

module.exports = {
  getNovo,
};
