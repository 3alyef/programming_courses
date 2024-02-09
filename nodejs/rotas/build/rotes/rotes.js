"use strict";
const expressRote = require('express');
const rotas = expressRote.Router();
let cursoInfo = [
    { "curso": "arduino", "info": "Curso de Arduino" },
    { "curso": "java", "info": "Curso de Java" },
    { "curso": "react", "info": "Curso de React" },
    { "curso": "python", "info": "Curso de Python" }
];
rotas.get('/', (request, response) => {
    response.json({ ola: "Welcome!" });
});
rotas.get('/:cursoid', (require, response) => {
    const curso = require.params.cursoid;
    const cursoI = cursoInfo.find((i) => i.curso === curso);
    if (!curso) {
        response.status(404).json({
            erro: "Curso não encontrado", CursoPesquisado: curso
        });
    }
    else {
        response.status(200).json(cursoI);
    }
});
module.exports = rotas;
