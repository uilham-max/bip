const DAOMentor = require('../database/DAOMentor');
const { validaCadastroMentor } = require('../helpers/utilsMentor');

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

exports.CadastrarNovoMentor = ( async (req, res) =>{
    let {nome, email, senha, cpf, endereco, areaConhecimento} = req.body;
    let validator = validaCadastroMentor(nome, email, senha, cpf, endereco, areaConhecimento);
    if (validator[0]){
        try{
            await DAOMentor.insert(nome, email, senha, cpf, endereco, areaConhecimento);
            res.status(200)
            res.send('Mentor created!')
        }catch(e){
            console.error(e)
            res.status(500);
            res.send('Internal error');
        }

    }else{
        res.status(400);
        res.send(validator[1]);
    }
});

exports.ListarTodosMentor = ( async (req, res) =>{
    Mentores = await DAOMentor.getAll();
    res.send(Mentores)
});