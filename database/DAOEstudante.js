const {Estudante} = require('../model/index');
const {conexao} = require('./conexao');
const {QueryTypes} = require('sequelize');

class DAOEstudante {
  static async insert(nome, email, senha, cpf, endereco, curso, semestre, matricula) {
    try {
      return await Estudante.create({
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        endereco: endereco,
        curso: curso,
        semestre: semestre,
        matricula: matricula,
      });
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async update(id, nome, email, senha, cpf, endereco, curso, semestre, matricula) {
    try {
      await Estudante.update(
        {
          nome: nome,
          email: email,
          senha: senha,
          cpf: cpf,
          endereco: endereco,
          curso: curso,
          semestre: semestre,
          matricula: matricula,
        },
        {where: {id: id}}
      );
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async delete(id) {
    try {
      await Estudante.destroy({where: {id: id}});
      return 0;
    } catch (error) {
      if (error instanceof Sequelize.ForeignKeyConstraintError) return 1;
      else return 2;
    }
  }

  static async getAll() {
    try {
      return await Estudante.findAll({order: ['nome']});
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getOne(id) {
    try {
      return await Estudante.findByPk(id);
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }
}

module.exports = DAOEstudante;
