const DAOEstudante = require('../database/DAOEstudante');
const {usuarioNome} = require('../helpers/getSessionNome');

const getListarEstudantes = async (req, res) => {
  let demandantes = await DAODemandante.getAll();
  if (!demandantes) {
    console.log('erro.');
  }
  // console.log(demandantes);
  res.send(demandantes);
};

const getLogin = (req, res) => {
  res.render('estudante/login', {mensagem: ''});
};

const postLogin = async (req, res) => {
  const estudante = await DAOEstudante.login(req.body.email, req.body.senha);
  if (estudante) {
    req.session.usuario = {
      id: estudante.id,
      nome: estudante.nome,
      email: estudante.email,
      tipo: 'estudante',
    };
    res.redirect('/');
  } else {
    res.render('estudante/login', {mensagem: 'Usuário ou senha inválidos.'});
  }
};

const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
const getNovoEstudante = (req, res) => {
  res.render('estudante/novo', {user: usuarioNome(req, res), mensagem: ''});
};

const getEditarEstudante = async (req, res) => {
  let estudante = await DAOEstudante.getOne(req.session.estudante.id);
  if (estudante) res.render('estudante/editar', {estudante: estudante, mensagem: ''});
  else res.render('error', {mensagem: 'Erro na tentativa de edição do Usuário.'});
};

const postNovoEstudante = async (req, res) => {
  const {nome, email, senha, repeteSenha, cpf, curso, semestre, matricula, cep, logradouro, complemento, bairro, localidade, uf, numeroDaCasa} = req.body;
  console.log(senha, repeteSenha);
  if (senha === repeteSenha) {
    console.log('dfdfdf');
    let result = await DAOEstudante.insert(nome, email, senha, cpf, curso, semestre, matricula, cep, logradouro, complemento, bairro, localidade, uf, numeroDaCasa);
    console.log(result);
    if (result) {
      res.render('estudante/login', {mensagem: 'Usuário criado com sucesso'});
      console.log('Estudante criado com sucesso');
    } else {
      res.render('estudante/novo', {
        user: usuarioNome(req, res),
        mensagem: 'Não foi possivel criar o usuario',
      });
      // console.log('Falha ao criar o estudante');
    }
  }
};

const postEditarEstudante = async (req, res) => {
  const {nome, email, senha, cpf, curso, semestre, matricula, cep, logradouro, complemento, bairro, localidade, uf, numeroDaCasa} = req.body;
  let result = await DAOEstudante.update(req.session.estudante.id, nome, email, senha, cpf, curso, semestre, matricula, nome, email, senha, cpf, curso, semestre, matricula, cep, logradouro, complemento, bairro, localidade, uf, numeroDaCasa);
  if (result) {
    let estudante = await DAOEstudante.getOne(req.session.estudante.id);
    res.render('estudante/editar', {
      estudante: estudante,
      mensagem: 'Usuário editado com sucesso',
    });
  } else {
    res.render('error', {mensagem: 'Falha ao editar usuário'});
  }
};
module.exports = {
  getLogin,
  getLogout,
  getNovoEstudante,
  getEditarEstudante,
  postEditarEstudante,
  postNovoEstudante,
  postLogin,
};
