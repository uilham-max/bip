const { Mentor } = require('../model/index');


class DAOMentor {

    static async insert(nome, email, senha, cpf, endereco, areaConhecimento) {
        try{
            const mentor = await Mentor
                .insert({ nome: this.nome, email: this.email, senha: this.senha,
                          cpf: this.cpf, endereco: this.endereco, areaConhecimento: this.areaConhecimento  });
        }catch(error){
            console.error(`Error on insert mentor ${nome}`,error);
            throw error;
        }
    }

    static async getAll() {
        try {
          const mentores = await Mentor.findAll();
          return mentores;
        } catch (error) {
            console.error('Error fetching mentores:', error);
            throw error;
        }
    }

    static async getOne(id) {
        try {
          const mentor = await Mentor.findByPk(id);
          if (!mentor) {
            throw new Error('Mentor not found');
          }
          return mentor;
        } catch (error) {
          console.error(`Error fetching mentor with ID ${id}:`, error);
          throw error;
        }
    }

    static async update(id, data) {
        try {
          const mentor = await Mentor.findByPk(id);
          if (!mentor) {
            throw new Error('Mentor not found');
          }
          await mentor.update(data);
          return mentor;
        } catch (error) {
          console.error(`Error updating mentor with ID ${id}:`, error);
          throw error;
        }
    }

    static async delete(id) {
        try {
          const mentor = await Mentor.findByPk(id);
          if (!mentor) {
            throw new Error('Mentor not found');
          }
          await mentor.destroy();
          return { message: 'Mentor deleted successfully' };
        } catch (error) {
          console.error(`Error deleting mentor with ID ${id}:`, error);
          throw error;
        }
      }
}

module.exports = DAOMentor;
