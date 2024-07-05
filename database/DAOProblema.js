const {Problema, Demandante, Proposta, Estudante} = require('../model/index');

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
      let problemas = await Problema.findAll({order: ['titulo'], include: {model: Demandante}});
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
