const DAOMentor = require('../database/DAOMentor');
const {usuarioNome} = require('../helpers/getSessionNome');

const {validaCadastroMentor} = require('../helpers/utilsMentor');
const bcrypt = require('bcrypt');

exports.RenderHomePageMentor = (req, res) => {
  res.send('200');
};

exports.RenderLogin = (req, res) => {
  res.render('mentor/login', {mensagem: ''});
  return;
};

exports.RenderCadastro = (req, res) => {
  res.render('mentor/novo', {user: usuarioNome(req, res), mensagem: ''} );
  return;
};

exports.RealizarLogin = async (req, res) => {
  let {email, senha} = req.body;
  const mentor = await DAOMentor.getOne({where: {email: email}});
  if (mentor) {
    if (bcrypt.compareSync(senha, mentor.dataValues.senha)) {
      req.session.usuario = {
        id: mentor.id,
        nome: mentor.nome,
        email: mentor.email,
        tipo: 'mentor',
      };
      console.log('Novo usuário na session:\n', req.session.usuario);
      res.redirect('/');
    } else {
      res.render('mentor/login', {mensagem: 'Usuário ou senha inválidos.'});
    }
  } else {
    res.render('mentor/login', {mensagem: 'Usuário ou senha inválidos.'});
  }
};

exports.CadastrarNovoMentor = async (req, res) => {
  let {nome, email, senha, cpf, cep, rua, numeroDaCasa, complemento, localidade, uf, areaConhecimento} = req.body;
  let endereco = {
    rua: rua,
    numeroDaCasa: numeroDaCasa,
    complemento: complemento,
    cep: cep,
    localidade: localidade,
    uf: uf,
  };
  let validator = validaCadastroMentor(nome, email, senha, cpf, endereco, areaConhecimento);
  if (validator[0]) {
    let enderecoString = JSON.stringify(endereco);
    try {
      const newMentor = await DAOMentor.insert(nome, email, senha, cpf, enderecoString, areaConhecimento);
      res.status(200);
      req.session.usuario = {
        id: newMentor.id,
        nome: newMentor.nome,
        email: newMentor.email,
        tipo: 'mentor',
      };
      console.log('Novo usuário na session:\n', req.session.usuario);
      res.redirect('/');
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send('Internal error');
    }
  } else {
    res.status(400);
    res.send(validator[1]);
  }
};

exports.ListarTodosMentor = async (req, res) => {
  Mentores = await DAOMentor.getAll();
  res.send(Mentores);
};
