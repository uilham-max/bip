const {DAOEstudante} = require('../database/DAOEstudante');

const getLogin = (req, res) => {
  res.render('estudante/login', {msg: ''});
};
const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/'); // <-- redireciona para pagina inicial
};
const getNovoEstudante = (req, res) => {
  res.render('estudante/novoEstudante', {msg: ''});
};

const getEditarEstudante = async (req, res) => {
  let estudante = await DAOEstudante.getOne(req.session.estudante.id);
  if (estudante) res.render('estudante/editarEstudante', {estudante: estudante, msg: ''});
  else res.render('error', {msg: 'Erro na tentativa de edição do Usuário.'});
};

const postNovoEstudante = async (req, res) => {
  const {nome, email, senha, senha2, cpf, endereco, curso, semestre, matricula} = req.body;
  if (senha === senha2) {
    let result = await DAOEstudante.insert(
      nome,
      email,
      senha,
      cpf,
      endereco,
      curso,
      semestre,
      matricula
    );
    if (result) {
      res.render('estudante/login', {msg: 'Usuário criado com sucesso'});
    } else {
      res.render('estudante/novoEstudante', {msg: 'Não foi possivel criar o usuario'});
    }
  }
};

const postEditarEstudante = async (req, res) => {
  const {nome, email, senha, cpf, endereco, curso, semestre, matricula} = req.body;
  let result = await DAOEstudante.update(
    req.session.estudante.id,
    nome,
    email,
    senha,
    cpf,
    endereco,
    curso,
    semestre,
    matricula
  );
  if (result) {
    let estudante = await DAOEstudante.getOne(req.session.estudante.id);
    res.render('estudante/editarEstudante', {
      estudante: estudante,
      msg: 'Usuário editado com sucesso',
    });
  } else {
    res.render('error', {msg: 'Falha ao editar usuário'});
  }
};
module.exports = {};
