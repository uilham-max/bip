const { Mentor } = require('../model/index');


export default class Mentor {

    static async insert(nome, email, senha, cpf, endereco, areaConhecimento) {
        try{
            let mentor = await Mentor
                .insert({ nome: this.nome, email: this.email, senha: this.senha,
                          cpf: this.cpf, endereco: this.endereco, areaConhecimento: this.areaConhecimento  });
        }catch(error){
            console.error(error);
        }
    }

}
