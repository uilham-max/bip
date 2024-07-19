const express = require('express');
const DAOProblema = require('../database/DAOProblema');
const {usuarioNome} = require('../helpers/getSessionNome');
const moment = require('moment-timezone');
const redisClient = require('../database/connectionRedis');
const util = require('util')

const getDetalhe = async (req, res) => {
  let problemaId = req.params.problemaId;
  let problema = await DAOProblema.getOne(problemaId);
  console.log('Estudante:', problema.proposta);
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
  console.log('Listando Problemas...');
  const cacheKey = 'problemas_lista';
  // await redisClient.del(cacheKey)
  try {
    // Tenta obter a lista de problemas do cache Redis
    console.log('Verificando cache no Redis...');
    let cacheData = await redisClient.get(cacheKey); 
    let problemas
    if (cacheData) {
      // Se os dados estão no cache, parseia e envia como resposta
      problemas = JSON.parse(cacheData);
      console.log('Pegando do Redis os dados cacheados!');
      return res.render('problema/lista', {user: usuarioNome(req, res), problemas: problemas, mensagem: ''});
    }
    console.log('Dados não encontrados no cache, buscando no PostgreSQL...');
    // Se não estão no cache, busca do banco de dados
    problemas = await DAOProblema.getAll();
    if (!problemas || problemas.length === 0) {
      const mensagem = !problemas ? 'Erro ao buscar a lista de problemas.' : 'Lista vazia.';
      return res.render('problema/lista', {user: usuarioNome(req, res), problemas: [], mensagem: mensagem});
    }
    // Armazena os dados no Redis com expiração (exemplo: 10 segundos)
    redisClient.set(cacheKey, JSON.stringify(problemas), {EX: 20});
    console.log('Cacheando os dados do PostgreSQL no Redis!');
    // Envia os dados como resposta
    res.render('problema/lista', {user: usuarioNome(req, res), problemas: problemas, mensagem: ''});
  } catch (err) {
    console.error('Erro:', err);
    res.render('problema/lista', {user: usuarioNome(req, res), problemas: [], mensagem: 'Erro ao buscar a lista de problemas.'});
  }
};


const getNovo = async (req, res) => {
  res.render('problema/novo', {user: usuarioNome(req, res), mensagem: ''});
};

const postNovo = async (req, res) => {
  let = {titulo, descricao} = req.body;
  let demandanteId = req.session.usuario.id;
  let dataSubmissao = moment.tz(new Date(), 'America/Sao_Paulo').format('YYYY-MM-DD');

  let insert = await DAOProblema.insert(descricao, dataSubmissao, titulo, 'PENDENTE', demandanteId);
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
    let result = await DAOProblema.update(problemaId, problema.descricao, problema.dataSubmissao, problema.titulo, 'desativado', problema.demandanteId);
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
