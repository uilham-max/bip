const {Problema, Proposta, Estudante} = require('../model/index');

class DAOProposta {
  static async insert(titulo, descricao, dataSubmissao, areaConhecimento, problemaId, estudanteId) {
    console.log("Inserindo Proposta: \n", titulo, descricao, dataSubmissao, areaConhecimento, problemaId, estudanteId);
    try {
      let proposta = await Proposta.create({
        titulo: titulo,
        descricao: descricao,
        dataSubmissao: dataSubmissao,
        areaConhecimento: areaConhecimento,
        problemaId: problemaId,
        estudanteId: estudanteId,
      });
      return proposta;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async update(id, titulo, descricao, dataSubmissao, areaConhecimento, problemaId, estudanteId) {
    try {
      let proposta = await Proposta.update(
        {
          titulo: titulo,
          descricao: descricao,
          dataSubmissao: dataSubmissao,
          areaConhecimento: areaConhecimento,
          problemaId: problemaId,
          estudanteId: estudanteId,
        },
        {where: {id: id}}
      );
      return proposta;
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
      let propostas = await Proposta.findAll({order: ['titulo'], include: {model: Estudante, model: Problema}});
      return propostas;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getByUser(id) {
    try {
      let propostas = await Proposta.findAll({
        order: ['titulo'],
        where: {estudanteIdId: id},
      });
      return propostas;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getOne(id) {
    try {
      let proposta = await Proposta.findByPk(id,{
        include: {model: Estudante}
      });
      // console.log("getOne --> \n",proposta);
      return proposta;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

}

module.exports = DAOProposta;
