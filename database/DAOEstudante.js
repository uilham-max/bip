  const {Estudante} = require('../model/index');
const bcrypt = require('bcrypt');

class DAOEstudante {
  static async login(email, senha) {
    try {
      let estudante = await Estudante.findOne({where: {email: email}});
      if (estudante) {
        if (bcrypt.compareSync(senha, estudante.senha)) {
          return estudante;
        }
        return false;
      }
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }
  static async insert(nome, email, senha, cpf, curso, semestre, matricula, cep, logradouro, complemento, bairro, localidade, uf, numero_da_casa) {
    try {
      console.log('aquii')
      let estudante = await Estudante.create({nome: nome, email: email, senha: bcrypt.hashSync(senha, 10), cpf: cpf, curso: curso, semestre: semestre, matricula: matricula, cep: cep, logradouro: logradouro, complemento: complemento, bairro: bairro, localidade: localidade, uf: uf, numero_da_casa: numero_da_casa});
      console.log(estudante);
      return estudante;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async update(id, nome, email, senha, cpf, curso, semestre, matricula, cep, logradouro, complemento, bairro, localidade, uf, numero_da_casa) {
    try {
      await Estudante.update({nome: nome, email: email, senha: bcrypt.hashSync(senha, 10), cpf: cpf, curso: curso, semestre: semestre, matricula: matricula, logradouro: logradouro, complemento: complemento, bairro: bairro, localidade: localidade, uf: uf, numero_da_casa: numero_da_casa}, {where: {id: id}});
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
