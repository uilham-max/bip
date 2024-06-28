const DAOProposta = require('../database/DAOProposta');

const getNovo = async (req, res) => {
  let problemaId = req.params.problemaId;
  res.render('proposta/novo', {user: usuarioNome(req, res), problemaId: problemaId, mensagem: ''});
};

const postNovo = async (req, res) => {
  let = {titulo, descricao, areaConhecimento} = req.body;
  let estudanteId = req.session.usuario.id;
  let dataSubmissao = moment.tz(new Date(), 'America/Sao_Paulo').format('YYYY-MM-DD');

  let insert = await DAOProposta.insert(titulo, descricao, dataSubmissao, areaConhecimento, 'problemaId', estudanteId);
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

module.exports(getNovo, postNovo);
