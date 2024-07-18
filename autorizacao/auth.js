function demandanteAutorizacao(req, res, next) {
  console.log('Session: ', req.session.usuario);
  if (req.session.usuario.tipo == 'demandante') {
    console.log('Usuario na session: ', req.session.user);
    next();
  } else {
    console.log('Não logado');
    res.render('erro', {mensagem: 'Apenas demandantes tem acesso!'});
  }
}
function estudanteAutorizacao(req, res, next) {
  if (req.session.usuario.tipo == 'estudante') {
    next();
  } else {
    res.render('erro', {mensagem: 'Apenas estudantes tem acesso!'});
  }
}
function mentorAutorizacao(req, res, next) {
  if (req.session.usuario.tipo == 'mentor') {
    next();
  } else {
    res.render('erro', {mensagem: 'Apenas mentores tem acesso!'});
  }
}

module.exports = {demandanteAutorizacao, estudanteAutorizacao, mentorAutorizacao};
