const { Demandante } = require('../model/index')

class DAODemandante{

    static async insert(nome, email, cpf, endereco){
        try{
            const demandante = await create({nome, email, cpf, endereco})
            return demandante
        }catch(erro){
            console.error(erro.toString());
            return undefined
        }

    }

}

module.exports = DAODemandante