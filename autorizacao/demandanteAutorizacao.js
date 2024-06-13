function demandanteAutorizacao(req, res, next){
    if(req.session.demandante != undefined) {
        next()
    } else {
        res.render('erro', {mensagem: "Acesso negado!"})
    }
}

module.exports = demandanteAutorizacao