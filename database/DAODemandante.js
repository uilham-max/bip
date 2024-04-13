const { Demandante } = require('../model/index')

class DAODemandante{

    static async insert(nome, email, senha, cpf, endereco){
        try{
            const demandante = await Demandante.create({nome, email, senha, cpf, endereco})
            return demandante
        }catch(erro){
            console.error(erro.toString());
            return undefined
        }

    }

}

module.exports = DAODemandante