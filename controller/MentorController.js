const DAOMentor = require('../database/DAOMentor');


exports.RenderHomePageMentor = ((req, res) =>{
    res.send('200');
});

exports.RenderLogin = ((req, res) =>{
    res.send('200');
});

exports.RenderCadastro = ((req, res) =>{
    res.send('200');
});

exports.RealizarLogin = ((req, res) =>{
    res.send('200');
});

exports.CadastrarBancoNovoMentor = ((req, res) =>{
    res.send('200');
});

exports.ListarTodosMentor = async ((req, res) =>{
    Mentores = DAOMentor.getAll();

    res.send(Mentores)
});