"use strict";
const tipo = document.querySelector('#tipo')?.querySelectorAll('input');
const imgs = document.querySelector('#imgs');
const tipos = [...tipo];
const nome = document.querySelector('#name');
const portas = document.querySelector('#portas');
const blindagem = document.querySelector('#blindagem');
const municao = document.querySelector('#municao');
const submit = document.querySelector('#submit');
const militarCards = document.querySelector('#militarCar');
const normalCards = document.querySelector('#normalCar');
let militarCars;
let normalCars;
let carrosMil = [];
let carrosNorm = [];
let carros = {};
fetch('http://localhost:5000/carros', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then((resp) => resp.json()).then((data) => {
    carros = data;
    console.log(data);
}).catch((err) => console.log(err)).then(() => {
    militarCars = carros[0]?.militar || [];
    normalCars = carros[0]?.normal || [];
    cardsGenerator(normalCars, false);
    cardsGenerator(militarCars, true);
});
const cardsGenerator = (elemento, isMilitar) => {
    elemento.forEach((el) => {
        let editar = document.createElement('input');
        editar.setAttribute('type', 'button');
        editar.setAttribute('value', 'Editar');
        editar.classList.add('btns');
        let remover = document.createElement('input');
        remover.setAttribute('type', 'button');
        remover.setAttribute('value', 'Remover');
        remover.classList.add('btns');
        let btnsContainer = document.createElement('div');
        btnsContainer.appendChild(remover);
        btnsContainer.appendChild(editar);
        let info = document.createElement('div');
        info.classList.add('info');
        let p = document.createElement('p');
        if (isMilitar) {
            p.textContent = 'Militar';
        }
        else {
            p.textContent = 'Normal';
        }
        p.classList.add('type');
        let card = document.createElement('div');
        const nome = document.createElement('p');
        nome.textContent = `Nome: ${el.nome}`;
        info.appendChild(nome);
        const portas = document.createElement('p');
        portas.textContent = `Portas ${el.portas}`;
        info.appendChild(portas);
        if (isMilitar) {
            const blindagem = document.createElement('p');
            blindagem.textContent = `Blindagem: ${el.blindagem}`;
            info.appendChild(blindagem);
            const municao = document.createElement('p');
            municao.textContent = `Munição: ${el.municao}`;
            info.appendChild(municao);
        }
        card.setAttribute('id', el.id);
        card.classList.add('card');
        card.appendChild(p);
        card.appendChild(info);
        card.appendChild(btnsContainer);
        if (isMilitar) {
            militarCards.appendChild(card);
        }
        else {
            normalCards.appendChild(card);
        }
    });
};
tipos.forEach((el, i) => {
    el.addEventListener('click', () => {
        if (el.id == 'militar') {
            document.body.classList.add('bodyMilitar');
            imgs.setAttribute('src', './src/public/militar.jpg');
            imgs.setAttribute('alt', 'carro_militar');
            blindagem.disabled = false;
            municao.disabled = false;
        }
        else {
            document.body.classList.remove('bodyMilitar');
            imgs.setAttribute('src', './src/public/normal_gol.jpg');
            imgs.setAttribute('alt', 'carro_normal');
            blindagem.disabled = true;
            municao.disabled = true;
        }
    });
});
submit?.addEventListener('click', (el) => {
    el.preventDefault();
    const nomeV = nome.value;
    const portasV = Number(portas.value);
    let blindagemV = 0;
    let municaoV = 0;
    let tipoC = '';
    let newCar = {};
    tipos.map((e) => {
        if (e.checked && e.id == 'militar') {
            blindagemV = Number(blindagem.value);
            municaoV = Number(municao.value);
            tipoC = e.id;
        }
        else if (e.checked) {
            tipoC = e.id;
        }
    });
    let lengthM = 0;
    let lengthN = 0;
    let carrosUpdate = [];
    militarCars.forEach((e) => {
        carrosUpdate.push(e);
        lengthM++;
    });
    normalCars.forEach((e) => {
        carrosUpdate.push(e);
        lengthN++;
    });
    if (tipoC == "militar") {
        newCar = { "nome": nomeV, "portas": portasV, "blindagem": blindagemV, "municao": municaoV, "id": lengthM };
        carrosUpdate.push(newCar);
    }
    else {
        newCar = { "nome": nomeV, "portas": portasV, "id": lengthN };
        carrosUpdate.push(newCar);
    }
    console.log(carrosUpdate);
    fetch('http://localhost:5000/carros', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrosUpdate)
    }).then((resp) => resp.json()).then((data) => console.log(data)).catch((err) => console.log(err));
});
