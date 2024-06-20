
// RETORNA SOMENTE AS INICIAS DO NOME
function usuarioNome(req, res){
    if(req.session.usuario && req.session.usuario.nome){
        let a = req.session.usuario.nome
        let b = req.session.usuario.sobrenome
        // return a[0] + b[0]
        return req.session.usuario
    } else {
        return ""
    }
}

module.exports = {
    usuarioNome,
}