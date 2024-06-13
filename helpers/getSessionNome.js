
// RETORNA SOMENTE AS INICIAS DO NOME
function demandanteNome(req, res){
    if(req.session.demandante && req.session.demandante.nome){
        let a = req.session.demandante.nome
        let b = req.session.demandante.sobrenome
        // return a[0] + b[0]
        return req.session.demandante
    } else {
        return ""
    }
}

module.exports = {
    demandanteNome,
}