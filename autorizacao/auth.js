function demandanteAutorizacao(req, res, next) {
  if (req.session.user.tipo == 'demandante') {
    next();
  } else {
    res.render('erro', {mensagem: 'Apenas demandantes tem acesso!'});
  }
}
function estudanteAutorizacao(req, res, next) {
  if (req.session.user.tipo == 'estudante') {
    next();
  } else {
    res.render('erro', {mensagem: 'Apenas estudantes tem acesso!'});
  }
}
function mentorAutorizacao(req, res, next) {
  if (req.session.user.mentor == 'mentor') {
    next();
  } else {
    res.render('erro', {mensagem: 'Apenas mentores tem acesso!'});
  }
}

module.exports = {demandanteAutorizacao, estudanteAutorizacao, mentorAutorizacao};
