const {Problema, Demandante, Proposta, Estudante} = require('../model/index');
const sequelize = require('../database/conexao');

class DAOProblema {
  static async insert(descricao, dataSubmissao, titulo, status, demandanteId) {
    try {
      let problema = await Problema.create({
        descricao: descricao,
        dataSubmissao: dataSubmissao,
        titulo: titulo,
        demandanteId: demandanteId,
        status: status,
      });
      return problema;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async update(id, descricao, dataSubmissao, titulo, status, demandanteId) {
    try {
      let problema = await Problema.update(
        {
          descricao: descricao,
          dataSubmissao: dataSubmissao,
          titulo: titulo,
          demandanteId: demandanteId,
          status: status,
        },
        {where: {id: id}}
      );
      return problema;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async delete(id) {
    try {
      await Problema.destroy({where: {id: id}});
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async getAll() {
    try {
      //let problemas = await Problema.findAll({order: ['titulo'], include: {model: Demandante}});
      let problemas = await sequelize.query(
        `
      SELECT prob.*, dem.*
      FROM problema prob
      LEFT JOIN proposta prop
        ON prob.id = prop."problemaId"
      JOIN demandante dem
        ON prob."demandanteId" = dem.id
      WHERE NOT EXISTS 
      (SELECT 1 from projeto proj WHERE proj."propostaId" = prop.id); `
      );
      console.log('teste1 :', problemas);
      problemas = problemas[0];
      console.log('teste2 :', problemas);
      problemas = problemas.map((result) => {
        let problema = {
          id: result.id,
          titulo: result.titulo,
          descricao: result.descricao,
          dataSubmissao: result.dataSubmissao,
          status: result.status,
          demandante: {
            id: result.demandanteId,
            nome: result.nome,
            // Se precisar de outros campos adicionar aqui
          },
        };
        return problema;
      });

      console.log('teste3 :', problemas);

      return problemas;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getByUser(id) {
    try {
      let problemas = await Problema.findAll({
        order: ['titulo'],
        where: {demandanteId: id},
      });
      return problemas;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getOne(id) {
    try {
      let problema = await Problema.findOne({
        include: [{model: Demandante}, {model: Proposta, include: Estudante}],
        where: {id: id},
      });
      return problema;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }
}

module.exports = DAOProblema;
