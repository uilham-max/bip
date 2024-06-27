const express = require('express');
const DAOProblema = require('../database/DAOProblema');
const {usuarioNome} = require('../helpers/getSessionNome');
const moment = require('moment-timezone');

const getDetalhe = async (req, res) => {
  let problemaId = req.params.problemaId;
  let problema = await DAOProblema.getOne(problemaId);
  if (!problema) {
    res.render('problema/detalhe', {
      user: usuarioNome(req, res),
      problema: problema,
      mensagem: 'Erro ao buscar problema.',
    });
  }
  res.render('problema/detalhe', {user: usuarioNome(req, res), problema: problema, mensagem: ''});
};

const getLista = async (req, res) => {
  let problemas = await DAOProblema.getAll();

  if (problemas == '') {
    res.render('problema/lista', {
      user: usuarioNome(req, res),
      problemas: problemas,
      mensagem: 'Lista vazia.',
    });
  }
  if (!problemas) {
    res.render('problema/lista', {
      user: usuarioNome(req, res),
      problemas: problemas,
      mensagem: 'Erro ao buscar a lista de problemas.',
    });
  }
  res.render('problema/lista', {user: usuarioNome(req, res), problemas: problemas, mensagem: ''});
};

const getNovo = async (req, res) => {
  res.render('problema/novo', {user: usuarioNome(req, res), mensagem: ''});
};

const postNovo = async (req, res) => {
  let = {titulo, descricao} = req.body;
  let demandanteId = req.session.usuario.id;
  let dataSubmissao = moment.tz(new Date(), 'America/Sao_Paulo').format('YYYY-MM-DD');

  let insert = await DAOProblema.insert(descricao, dataSubmissao, titulo, "PENDENTE", demandanteId);
  if (!insert) {
    res.render('problema/novo', {
      user: usuarioNome(req, res),
      mensagem: 'Erro ao enviar problema.',
    });
  }
  res.render('problema/novo', {
    user: usuarioNome(req, res),
    mensagem: 'Seu problema foi enviado com sucesso!',
  });
};

const getDesativar = async (req, res) => {
  let problemaId = req.params.problemaId;
  let problema = await DAOProblema.getOne(problemaId);

  if (problema) {
    let result = await DAOProblema.update(
      problemaId,
      problema.descricao,
      problema.dataSubmissao,
      problema.titulo,
      'desativado',
      problema.demandanteId
    );
    if (!result) return false;
    res.redirect('/problema/lista');
  }
  return false;
};

module.exports = {
  getNovo,
  postNovo,
  getLista,
  getDetalhe,
  getDesativar,
};
