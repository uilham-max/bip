const express = require('express');
const DAODemandante = require('../database/DAODemandante');
const bcrypt = require('bcrypt');

const getListarDemandates = async (req, res) => {
  let demandantes = await DAODemandante.getAll();
  if (!demandantes) {
    console.log('erro.');
  }
  // console.log(demandantes);
  res.send(demandantes);
};

const postLogin = async (req, res) => {
  let {email, senha} = req.body;
  DAODemandante.login(email).then((demandante) => {
    if (demandante) {
      console.log(demandante.email, demandante.senha);
      if (bcrypt.compareSync(senha, demandante.senha)) {
        req.session.demandante = {
          id: demandante.id,
          nome: demandante.nome,
          email: demandante.email,
        };
        console.log(req.session.demandante.nome, 'fez login...');
        res.send('Demandante logou!');
        // res.redirect('/')
      } else {
        res.send('Erro no login');
        // res.render('login', {mensagem: 'Usuário ou senha inválidos.'})
      }
    } else {
      res.send('Usuário ou senha inválidos');
      // res.render('login', {mensagem: 'Usuário ou senha inválidos.'})
    }
  });
};

const postCriarDemandante = async (req, res) => {
  let {
    nome,
    email,
    senha,
    repeteSenha,
    cpf,
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    numeroDaCasa,
  } = req.body;

  // Não permite numeros ou caracteres especiais no nome
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
    res.send({
      mensagem: 'Erro. Números ou caracteres epeciais.',
    });
    return;
  }

  // Menos de 2 ou mais de 100 caracteres no nome
  if (nome.length < 5 || nome.length > 100) {
    res.send({
      mensagem: 'Erro. Deve ter entre 5 e 100 caracteres.',
    });
    return;
  }

  // Verifica o tamanho da senha
  if (senha.length < 8 || senha != repeteSenha) {
    res.send({
      mensagem: 'Erro. A senha de ter mais de 8 dígitos.',
    });
    return;
  }

  cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

  // O CPF deve ter 11 dígitos numéricos
  if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
    res.send({
      mensagem: 'Erro. CPF Deve ter 11 dígitos.',
    });
    return;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    res.send({
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
    res.send({
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
    res.send({
      mensagem: 'Erro. CPF Segundo dígito verificador inválido.',
    });
    return;
  }

  // CEP
  cep.replace(/\D/g, '');
  if (cep.length !== 8) {
    res.send({
      mensagem: 'Erro. CEP Deve ter 8 dígitos numéricos.',
    });
    return;
  }

  // Rua
  if (logradouro.length < 2 || logradouro.length > 100) {
    res.send({
      mensagem: 'Erro. Tamanho de logradouro inválido.',
    });
    return;
  }

  // Numero casa
  numeroDaCasa.replace(/\D/g, '');
  if (numeroDaCasa.length < 1 || numeroDaCasa.length > 50000 || numeroDaCasa < 1) {
    res.send({
      mensagem: 'Erro. Nº inválido.',
    });
    return;
  }

  // Localidade
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(localidade) || localidade.length < 2 || localidade.length > 50) {
    res.send({
      mensagem: 'Erro. Cidade inválida.',
    });
    return;
  }

  salt = bcrypt.genSaltSync(10);
  hashSenha = bcrypt.hashSync(senha, salt);

  // res.send({
  //     "mensagem": "Sucesso.",
  //     "hashSenha": hashSenha
  // })
  // return

  // console.log(req.body);
  let demandante = await DAODemandante.insert(
    nome,
    email,
    hashSenha,
    cpf,
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    numeroDaCasa
  );
  if (!demandante) {
    console.log('erro.');
  }

  res.send(demandante);
};

module.exports = {
  postCriarDemandante,
  getListarDemandates,
  postLogin,
};
