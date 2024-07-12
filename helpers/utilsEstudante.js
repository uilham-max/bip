const dominios_de_email_permitidos = [
    'academico.ifsul.edu.br'
]

exports.validaCadastroEstudante = (nome, email, senha, repeteSenha, cpf, curso, semestre, matricula, cep, logradouro, complemento, bairro, localidade, uf, numeroDaCasa) => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !email || !senha || !repeteSenha || !cpf || !curso || !semestre || !matricula || !cep || !logradouro || !bairro || !localidade || !uf || !numeroDaCasa) {
        return [false, "Todos os campos são obrigatórios."];
    }

    // Verifica se o email tem um formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return [false, "Email inválido."];
    }

    // Verifica se o CPF tem um formato válido
    const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
    if (!cpfRegex.test(cpf)) {
        return [false, "CPF inválido."];
    }

    // Mínimo oito caracteres, pelo menos uma letra e um número
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!regexPassword.test(senha)) {
        return [false, "Senha fraca, mínimo oito caracteres, pelo menos uma letra e um número."]
    }

    // Verifica se a senha e a repetição da senha são iguais
    if (senha !== repeteSenha) {
        return [false, "As senhas não coincidem."];
    }

    // Verifica se o email está dentro dos domínios permitidos
    let email_domain = email.split('@')[1];
    if (!dominios_de_email_permitidos.includes(email_domain)) {
        return [false, "Domínio de email não válido."];
    }

    // Se todas as verificações passarem
    return [true, "Cadastro de estudante válido!"];
};
