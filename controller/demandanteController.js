const express = require('express');
const DAODemandante = require('../database/DAODemandante');
const bcrypt = require('bcrypt');
const {usuarioNome} = require('../helpers/getSessionNome');

const getEditar = async (req, res) => {
  let id = req.params.id;
  console.log(req.params);
  let demandante = await DAODemandante.getOne(id);
  if (!demandante) {
    res.send('erro');
    // res.render('erro', {mensagem: "Erro ao buscar demandante."})
  }
  res.send(demandante);
  // res.render('demandante/editar/:id', {user: usuarioNome(req, res), mensagem: ""})
};

const postEditar = async (req, res) => {};

const getListarDemandantes = async (req, res) => {
  let demandantes = await DAODemandante.getAll();
  if (!demandantes) {
    console.log('erro.');
  }
  // console.log(demandantes);
  res.send(demandantes);
};

const getLogin = async (req, res) => {
  res.render('demandante/login', {mensagem: ''});
};

const getLogout = async (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const postLogin = async (req, res) => {
  let {email, senha} = req.body;
  console.log(email, senha);
  DAODemandante.login(email).then((demandante) => {
    if (demandante) {
      console.log(demandante.email, demandante.senha);
      if (bcrypt.compareSync(senha, demandante.senha)) {
        req.session.usuario = {id: demandante.id, nome: demandante.nome, email: demandante.email, tipo: 'demandante'};
        console.log(req.session.usuario.nome, 'fez login...');
        res.redirect('/');
      } else {
        res.render('demandante/login', {mensagem: 'Usuário ou senha inválidos.'});
      }
    } else {
      res.render('demandante/login', {mensagem: 'Usuário ou senha inválidos.'});
    }
  });
};

const getNovoDemandante = async (req, res) => {
  res.render('demandante/novo', {user: usuarioNome(req, res), mensagem: ''});
};

const postNovoDemandante = async (req, res) => {
  let {nome, email, senha, repeteSenha, cpf, cep, logradouro, complemento, bairro, localidade, uf, numeroDaCasa, tipoUsuario} = req.body;
  // cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

  // console.log(req.body);

  // console.log(cpf);
  // Não permite numeros ou caracteres especiais no nome
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
    res.render('erro', {mensagem: 'erro no nome'});
    return;
  }

  // Menos de 2 ou mais de 100 caracteres no nome
  if (nome.length < 5 || nome.length > 100) {
    res.render('erro', {
      mensagem: 'Erro. Deve ter entre 5 e 100 caracteres.',
    });
    return;
  }

  // Verifica o tamanho da senha
  if (senha.length < 8 || senha != repeteSenha) {
    res.render('erro', {
      mensagem: 'Erro. A senha de ter mais de 8 dígitos.',
    });
    return;
  }

  cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

  console.log('cpf replaceado', cpf);
  // O CPF deve ter 11 dígitos numéricos
  if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
    res.render('erro', {
      mensagem: 'Erro. CPF Deve ter 11 dígitos.',
    });
    return;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    res.render('erro', {
      mensagem: 'Erro. CPF Com todos dígitos iguais.',
    });
    return;
  }

  // Verifica o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

  if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
    res.render('erro', {
      mensagem: 'Erro. CPF Primerio dígito verificador inválido.',
    });
    return;
  }

  // Verifica o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

  if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
    res.render('erro', {
      mensagem: 'Erro. CPF Segundo dígito verificador inválido.',
    });
    return;
  }

  // CEP
  cep = cep.replace(/\D/g, '');
  if (cep.length !== 8) {
    res.render('erro', {
      mensagem: 'Erro. CEP Deve ter 8 dígitos numéricos.',
    });
    return;
  }

  // Rua
  if (logradouro.length < 2 || logradouro.length > 100) {
    res.render('erro', {
      mensagem: 'Erro. Tamanho de logradouro inválido.',
    });
    return;
  }

  // Numero casa
  numeroDaCasa.replace(/\D/g, '');
  if (numeroDaCasa.length < 1 || numeroDaCasa.length > 50000 || numeroDaCasa < 1) {
    res.render('erro', {
      mensagem: 'Erro. Nº inválido.',
    });
    return;
  }

  // Localidade
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(localidade) || localidade.length < 2 || localidade.length > 50) {
    res.render('erro', {
      mensagem: 'Erro. Cidade inválida.',
    });
    return;
  }

  salt = bcrypt.genSaltSync(10);
  hashSenha = bcrypt.hashSync(senha, salt);

  let demandante = await DAODemandante.insert(nome, email, hashSenha, cpf, cep, logradouro, complemento, bairro, localidade, uf, numeroDaCasa);
  if (!demandante) {
    res.render('erro', {mensagem: 'Erro ao inserir demante.'});
  }
  req.session.usuario = {id: demandante.id, nome: demandante.nome, sobrenome: demandante.sobrenome, email: demandante.email};

  console.log('Demandante inserido.');

  res.redirect('/');
};

module.exports = {
  getNovoDemandante,
  postNovoDemandante,
  getLogin,
  postLogin,
  getLogout,
};
