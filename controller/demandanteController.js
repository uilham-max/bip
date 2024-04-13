const express = require('express')
const DAODemandante = require('../database/DAODemandante')

const postCriarDemandante = async (req, res) => {
    let {nome, email, senha, cpf, endereco} = req.body
    // console.log(req.body);
    let demandante = await DAODemandante.insert(nome, email, senha, cpf, endereco)
    if(!demandante){
        console.log("erro.");
    }
    res.send(demandante)
    
}

module.exports = {
    postCriarDemandante,
}