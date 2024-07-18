const {Projeto, Mentor, Proposta, Estudante} = require('../model/index');

class DAOProjeto {
  static async insert(titulo, descricao, dataInicio, dataFim, insumo, custoTotal, propostaId, mentorId) {
    console.log('Inserindo Projeto: \n', titulo, descricao, dataInicio, dataFim, insumo, custoTotal, propostaId, mentorId);
    try {
      let projeto = await Projeto.create({
        titulo: titulo,
        descricao: descricao,
        dataInicio: dataInicio,
        dataFim: dataFim,
        insumo: insumo,
        custoTotal: custoTotal,
        propostaId: propostaId,
        mentorId: mentorId,
      });
      return projeto;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async update(id, titulo, descricao, dataInicio, dataFim, insumo, custoTotal, propostaId, mentorId) {
    try {
      let projeto = await Projeto.create(
        {
          titulo: titulo,
          descricao: descricao,
          dataInicio: dataInicio,
          dataFim: dataFim,
          insumo: insumo,
          custoTotal: custoTotal,
          propostaId: propostaId,
          mentorId: mentorId,
        },
        {where: {id: id}}
      );
      return projeto;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async delete(id) {
    try {
      await Projeto.destroy({where: {id: id}});
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async getAll() {
    try {
      let projetos = await Projeto.findAll({order: ['titulo'], include: [{model: Mentor}, {model: Proposta}, {model: Estudante}]});
      return projetos;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getByUser(id) {
    try {
      let projetos = await Projeto.findAll({
        order: ['titulo'],
        where: {mentorId: id},
      });
      return projetos;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getOne(id) {
    try {
      let projeto = await Projeto.findByPk(id, {
        include: {model: Mentor},
      });
      return projeto;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }
}

module.exports = DAOProjeto;
