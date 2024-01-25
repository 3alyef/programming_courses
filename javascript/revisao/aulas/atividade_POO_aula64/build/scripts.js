"use strict";
const nome = document.querySelector('#name');
const portas = document.querySelector('#portas');
const blindagem = document.querySelector('#blindagem');
const municao = document.querySelector('#municao');
const tipos = document.querySelector('#tipo')?.querySelectorAll('input');
const imgs = document.querySelector('#imgs');
const submit = document.querySelector('#submit');
const showMilitit = document.querySelector('#militarCar');
const showNormal = document.querySelector('#normalCar');
let cardsNormais = [];
let cardsMilitares = [];
const updateServerRemove = (id, type) => {
    fetch(`http://localhost:5000/${type.toLowerCase()}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json()).catch((error) => console.log(error));
    console.log(id);
};
const removerCard = (card, type) => {
    if (type === 'Militar') {
        let index = Number(card.dataset.index);
        updateServerRemove(cardsMilitares[index].id, type);
        cardsMilitares.splice(index, 1);
    }
    else {
        let index = Number(card.dataset.index);
        updateServerRemove(cardsNormais[index].id, type);
        cardsNormais.splice(index, 1);
    }
    cardsConstrutor(cardsNormais, cardsMilitares);
};
const reporData = (card) => {
    if (card.querySelector('.type')?.textContent == 'Militar') {
        const obj = cardsMilitares[Number(card.dataset.index)];
        nome.value = obj.nome;
        portas.value = obj.portas;
        blindagem.value = obj.blindagem;
        municao.value = obj.municao;
    }
    else {
        const obj = cardsNormais[Number(card.dataset.index)];
        nome.value = obj.nome;
        portas.value = obj.portas;
    }
};
const editarCard = (card, type) => {
    if (type === 'Militar') {
        trocaImagem(imgs, true);
        trocaCor(true);
        blindagemMunicao(true, blindagem, municao);
        submit.value = 'Atualizar';
        submit.dataset.eleditid = card.id;
        submit.dataset.cardtype = type;
        reporData(card);
        tipos.forEach((el) => {
            if (el.id == 'militar') {
                el.checked = true;
            }
            el.disabled = true;
        });
    }
    else {
        trocaImagem(imgs, false);
        trocaCor(false);
        blindagemMunicao(false, blindagem, municao);
        submit.value = 'Atualizar';
        submit.dataset.eleditid = card.id;
        submit.dataset.cardtype = type;
        reporData(card);
        tipos.forEach((el) => {
            if (el.id == 'normal') {
                el.checked = true;
            }
            el.disabled = true;
        });
    }
};
const btnsFuncoes = (btn, card, type) => {
    btn.addEventListener('click', () => {
        if (btn.value === 'Remover') {
            removerCard(card, type);
        }
        else {
            editarCard(card, type);
        }
    });
};
// Coleta os dados
const normaisRequest = () => {
    const normal = new Promise((resolve, reject) => {
        fetch('http://localhost:5000/normal', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((resp) => resp.json()).then((data) => resolve(data)).catch((err) => reject(err));
    });
    return normal;
};
const militaresRequest = () => {
    const militar = new Promise((resolve, reject) => {
        fetch('http://localhost:5000/militar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json()).then((data) => resolve(data)).catch((err) => reject(err));
    });
    return militar;
};
const cardGenerator = (el, type, id, index) => {
    const info = document.createElement('div');
    info.setAttribute('class', 'info');
    const nomeL = document.createElement('p');
    nomeL.textContent = `Nome: ${el.nome}`;
    const portasL = document.createElement('p');
    portasL.textContent = `Portas: ${el.portas}`;
    const blindagemL = document.createElement('p');
    blindagemL.textContent = `Blindagem: ${el.blindagem}`;
    const municaoL = document.createElement('p');
    municaoL.textContent = `Munição: ${el.municao}`;
    info.appendChild(nomeL);
    info.appendChild(portasL);
    info.appendChild(blindagemL);
    info.appendChild(municaoL);
    const btns = document.createElement('div');
    btns.setAttribute('class', 'btnsContainer');
    const remover = document.createElement('input');
    remover.setAttribute('type', 'button');
    remover.setAttribute('value', 'Remover');
    remover.setAttribute('class', 'btns');
    remover.classList.add('btnsRemover');
    const editar = document.createElement('input');
    editar.setAttribute('type', 'button');
    editar.setAttribute('value', 'Editar');
    editar.setAttribute('class', 'btns');
    editar.classList.add('editarBtns');
    btns.appendChild(remover);
    btns.appendChild(editar);
    const title = document.createElement('p');
    title.textContent = type;
    title.setAttribute('class', 'type');
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('data-index', String(index));
    card.setAttribute('id', String(id));
    card.appendChild(title);
    card.appendChild(info);
    card.appendChild(btns);
    btnsFuncoes(remover, card, type);
    btnsFuncoes(editar, card, type);
    return card;
};
const cardsConstrutor = (normais, militares) => {
    showMilitit.innerHTML = '';
    showNormal.innerHTML = '';
    normais.forEach((el, i) => {
        const card = cardGenerator(el, 'Normal', el.id, i);
        showNormal.appendChild(card);
    });
    militares.forEach((el, i) => {
        const card = cardGenerator(el, 'Militar', el.id, i);
        showMilitit.appendChild(card);
    });
};
// Renderiza todos os Cards na tela principal
const showCards = async () => {
    try {
        cardsNormais = await normaisRequest();
        cardsMilitares = await militaresRequest();
        cardsConstrutor(cardsNormais, cardsMilitares);
    }
    catch (error) {
        console.log(error);
    }
};
showCards();
// Configura a troca de cor e imagem e bloqueia ou debloqueia a blindagem e munição
tipos.forEach((el) => {
    el.addEventListener('click', () => {
        if (el.id === 'militar') {
            trocaImagem(imgs, true);
            trocaCor(true);
            blindagemMunicao(true, blindagem, municao);
        }
        else {
            trocaImagem(imgs, false);
            trocaCor(false);
            blindagemMunicao(false, blindagem, municao);
        }
    });
});
const trocaImagem = (imagem, isMilitar) => {
    if (isMilitar) {
        imagem.setAttribute('src', './src/public/militar.jpg');
        imagem.setAttribute('alt', 'carro_militar');
    }
    else {
        imagem.setAttribute('src', './src/public/normal_gol.jpg');
        imagem.setAttribute('alt', 'carro_modelo_gol');
    }
};
const trocaCor = (isMilitar) => {
    if (isMilitar) {
        document.body.classList.add('bodyMilitar');
    }
    else {
        document.body.classList.remove('bodyMilitar');
    }
};
const blindagemMunicao = (isMilitar, bld, mnc) => {
    if (isMilitar) {
        bld.disabled = false;
        mnc.disabled = false;
    }
    else {
        bld.disabled = true;
        mnc.disabled = true;
    }
};
const setData = (isMilitar) => {
    const data = { "nome": '', "portas": 0, "blindagem": 0, "municao": 0 };
    let nomeValue = nome.value;
    let portasValue = Number(portas.value);
    if (isMilitar) {
        let blindagemValue = Number(blindagem.value);
        let municaoValue = Number(municao.value);
        data.blindagem = blindagemValue;
        data.municao = municaoValue;
    }
    data.nome = nomeValue;
    data.portas = portasValue;
    return data;
};
const updateServer = (type, id, object) => {
    fetch(`http://localhost:5000/${type.toLowerCase()}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }).then((resp) => resp.json()).then((data) => console.log(data)).catch((error) => console.log(error));
};
const updateData = (id, type) => {
    let newName = nome.value;
    let newPortas = portas.value;
    let newblindagem = blindagem.value;
    let newMunicao = municao.value;
    nome.value = '';
    portas.value = '';
    blindagem.value = '';
    municao.value = '';
    let index = 0;
    let objUpdate = { "id": "", "nome": "", "portas": "", "blindagem": "", "municao": "" };
    if (type === 'Militar') {
        cardsMilitares.forEach((el, i) => {
            if (el.id === id)
                index = i;
        });
        objUpdate.id = id;
        objUpdate.nome = newName;
        objUpdate.portas = newPortas;
        objUpdate.blindagem = newblindagem;
        objUpdate.municao = newMunicao;
        cardsMilitares[index] = objUpdate;
        updateServer(type, id, objUpdate);
    }
    else {
        cardsNormais.forEach((el, i) => {
            if (el.id === id)
                index = i;
        });
        objUpdate.id = id;
        objUpdate.nome = newName;
        objUpdate.portas = newPortas;
        objUpdate.blindagem = newblindagem;
        objUpdate.municao = newMunicao;
        cardsNormais[index] = objUpdate;
        updateServer(type, id, objUpdate);
    }
    cardsConstrutor(cardsNormais, cardsMilitares);
};
submit.addEventListener('click', (el) => {
    el.preventDefault();
    let elemento = el.target;
    if (elemento.value === 'Adicionar') {
        let isMilitar = false;
        tipos.forEach((el) => {
            if (el.checked && el.id == 'militar') {
                isMilitar = true;
            }
        });
        const newCar = setData(isMilitar);
        const newCarId = 2;
        const newCarTipo = isMilitar ? 'militar' : 'normal';
        if (isMilitar) {
            cardsMilitares.push(newCar);
            cardsConstrutor(cardsMilitares, cardsNormais);
        }
        else {
            cardsNormais.push(newCar);
            cardsConstrutor(cardsMilitares, cardsNormais);
        }
        fetch(`http://localhost:5000/${newCarTipo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        }).then((resp) => resp.json()).then((data) => console.log('sucesso!', data)).catch((err) => console.log(err));
    }
    else {
        const elementId = String(elemento.dataset.eleditid);
        const cardType = String(elemento.dataset.cardtype);
        elemento.dataset.eleditid = '';
        elemento.dataset.cardtype = '';
        elemento.value = 'Adicionar';
        tipos.forEach((el) => {
            el.disabled = false;
        });
        updateData(elementId, cardType);
    }
});
