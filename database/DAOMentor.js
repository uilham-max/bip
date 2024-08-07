const { Mentor } = require('../model/index');
const bcrypt = require('bcrypt');

class DAOMentor {

    static async insert(nome, email, senha, cpf, endereco, areaConhecimento) {
        try {
            let cryptPass = bcrypt.hashSync(senha, 10)
            console.log(cryptPass)
            const mentor = await Mentor.create({ nome: nome, email: email, senha: cryptPass, cpf: cpf, endereco: endereco, areaConhecimento:areaConhecimento });
            return mentor; // Return the created mentor
        } catch (error) {
            console.error(`Error on insert mentor ${nome}:`, error);
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

    static async getOne(data) {
        try {
            const mentor = await Mentor.findOne(data);
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
