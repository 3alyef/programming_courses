"use strict";
let nomes = [];
nomes.push('Alef');
nomes.unshift('Yakov');
nomes.unshift('Itzkhaq');
nomes.unshift('Avraham');
console.log(nomes);
let dados = {
    nome: 'Alef',
    idade: 18,
    abilitacao: false,
    info: (nm, id, abil) => {
        console.log(`Nome: ${nm}, idade: ${id}, É abilitado: ${abil ? 'Sim' : 'Não'}`);
    }
};
dados.info(dados.nome, dados.idade, dados.abilitacao);
console.log(typeof dados);
