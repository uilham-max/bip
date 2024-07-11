
const dominios_de_email_permitidos = [
    'ifsul.edu.br'
]

exports.validaCadastroMentor = (nome, email, senha, cpf, endereco, areaConhecimento) => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !email || !senha || !cpf || !endereco || !areaConhecimento) {
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
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!regexPassword.test(senha)){
        return [false, "Senha fraca, mínimo oito caracteres, pelo menos uma letra e um número."]
    }
    
    // Verifica se email está dentro dos dominios permitidos
    let email_domain = email.split('@');
    let email_confirmed = false;
    dominios_de_email_permitidos.forEach((element)=>{
        console.log(element, email_domain[1])
        if(element === email_domain[1]){
            email_confirmed = true;
        }
    })
    console.log(email_confirmed)
    if(email_confirmed){
        return [true, "Mentor created!"]
    }else{
        return [false, "Dominio de email não valido!"]
    }
    
};
