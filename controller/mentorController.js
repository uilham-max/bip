const DAOMentor = require('../database/DAOMentor');
const { validaCadastroMentor } = require('../helpers/utilsMentor');

exports.RenderHomePageMentor = ((req, res) =>{
    res.send('200');
});

exports.RenderLogin = ((req, res) =>{
    res.send('200')
});

exports.RenderCadastro = ((req, res) =>{
    res.render('mentor/novo');
    return;
});

exports.RealizarLogin = ((req, res) =>{
    const mentor = DAOMentor.getOne({email: req.body.email})
    if (mentor) {
        req.session.usuario = {
            id: estudante.id,
            nome: estudante.nome,
            email: estudante.email,
            tipo: 'estudante',
        };
    console.log("Novo usuário na session:\n",req.session.usuario);
    res.redirect('/');
    } else {
    res.render('estudante/login', {mensagem: 'Usuário ou senha inválidos.'});
    }
});

exports.CadastrarNovoMentor = ( async (req, res) =>{
    let {nome, email, senha, cpf, cep, rua, numeroDaCasa, complemento, localidade, uf, areaConhecimento} = req.body;
    let endereco = {
        rua: rua,
        numeroDaCasa: numeroDaCasa,
        complemento: complemento,
        cep: cep,
        localidade: localidade,
        uf: uf
    }
    let validator = validaCadastroMentor(nome, email, senha, cpf, endereco, areaConhecimento);
    if (validator[0]){
        let enderecoString = JSON.stringify(endereco);
        try{
            await DAOMentor.insert(nome, email, senha, cpf, enderecoString, areaConhecimento);
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