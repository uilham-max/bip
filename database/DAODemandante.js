const { Demandante } = require('../model/index')

class DAODemandante{


    static async login(email){
        let demandante = await Demandante.findOne({where: {email: email}})
        try{
            if(demandante){
                    return demandante
            } else {
                return undefined
            }
        } catch(erro){
            console.log(erro.toString);
            return undefined
        }
        
    }

    static async insert(nome, email, senha, cpf, cep, logradouro, complemento, bairro, localidade, uf, numero_da_casa){
        try{
            const demandante = await Demandante.create({nome, email, senha, cpf, cep, logradouro, complemento, bairro, localidade, uf, numero_da_casa})
            return demandante
        }catch(erro){
            console.error(erro.toString());
            return undefined
        }

    }

    static async getAll(){
        try{
            const demandantes = await Demandante.findAll()
            return demandantes
        }catch(erro){
            console.error(erro.toString());
            return undefined
        }
    }

}

module.exports = DAODemandante