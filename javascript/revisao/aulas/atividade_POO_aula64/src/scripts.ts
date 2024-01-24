const nome = document.querySelector('#name') as HTMLInputElement;
const portas = document.querySelector('#portas') as HTMLInputElement;
const blindagem = document.querySelector('#blindagem') as HTMLInputElement;
const municao = document.querySelector('#municao') as HTMLInputElement;

const tipos = (document.querySelector('#tipo') as HTMLElement)?.querySelectorAll('input')

const imgs = document.querySelector('#imgs') as HTMLElement

const submit = document.querySelector('#submit') as HTMLFormElement


const showMilitit = document.querySelector('#militarCar') as HTMLElement

const showNormal = document.querySelector('#normalCar') as HTMLElement

let cardsNormais:any[]= []
let cardsMilitares:any[]= []


// Coleta os dados
const normaisRequest = () => {
    const normal = new Promise<any>((resolve, reject) => {
        fetch('http://localhost:5000/normal', {
            method: 'GET',
            headers:{
                "Content-Type":'application/json'
            }
        }).then((resp)=>resp.json()).then((data)=> resolve(data)).catch((err)=>reject(err))


    })
    return normal
}

const militaresRequest = () => {
    const militar = new Promise<any>((resolve, reject) => {
        fetch('http://localhost:5000/militar', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }).then((resp)=>resp.json()).then((data)=> resolve(data)).catch((err)=> reject(err))
    })
    return militar
}

const cardGenerator = (el:any, type:string)=>{
    const info = document.createElement('div')
    info.setAttribute('class', 'info')
    const nomeL = document.createElement('p')
    nomeL.textContent = `Nome: ${el.nome}`
    const portasL = document.createElement('p')
    portasL.textContent = `Portas: ${el.portas}`
    const blindageL = document.createElement('p')
    blindageL.textContent = `Blindagem: ${el.blindagem}`
    const municaoL = document.createElement('p')
    municao.textContent = `Munição: ${el.municao}`
    info.appendChild(nomeL)
    info.appendChild(portasL)
    info.appendChild(blindageL)
    info.appendChild(municaoL)


    const btns = document.createElement('div')
    btns.setAttribute('class', 'btnsContainer')

    const remover = document.createElement('input')
    remover.setAttribute('type', 'button')
    remover.setAttribute('value', 'Remover')
    remover.setAttribute('class', 'btns')

    const editar = document.createElement('input')
    editar.setAttribute('type', 'button')
    editar.setAttribute('value', 'Editar')
    editar.setAttribute('class', 'btns')

    btns.appendChild(remover)
    btns.appendChild(editar)

    const title = document.createElement('p')
    title.textContent = type
    title.setAttribute('class', 'type')

    const card = document.createElement('div')
    card.setAttribute('class', 'card')

    card.appendChild(title)
    card.appendChild(info)
    card.appendChild(btns)
    return card
}

const cardsConstrutor = (normais:any[], militares:any[]) => {
    normais.forEach((el)=>{
        const card = cardGenerator(el, 'Normal')
        showNormal.appendChild(card)
    })

    militares.forEach((el)=>{
        const card = cardGenerator(el, 'Militar')
        showMilitit.appendChild(card)
    })
}


// Renderiza todos os Cards na tela principal
const showCards = async ()=>{
    try{
        cardsNormais = await normaisRequest()
        cardsMilitares = await militaresRequest()
        
        cardsConstrutor(cardsNormais, cardsMilitares)

        
    }catch(error){
        console.log(error)
    }
}

showCards()



// Configura a troca de cor e imagem e bloqueia ou debloqueia a blindagem e munição

tipos.forEach((el)=>{
    el.addEventListener('click', ()=>{
        if(el.id === 'militar'){
            trocaImagem(imgs, true)
            trocaCor(true)
            blindagemMunicao(true, blindagem, municao)
        } else {
            trocaImagem(imgs, false)
            trocaCor(false)
            blindagemMunicao(false, blindagem, municao)
        }
        
    })
   
})

const trocaImagem = (imagem:HTMLElement, isMilitar:boolean)=>{
    if(isMilitar){
        imagem.setAttribute('src', './src/public/militar.jpg')
        imagem.setAttribute('alt', 'carro_militar')
    } else {
        imagem.setAttribute('src', './src/public/normal_gol.jpg')
        imagem.setAttribute('alt', 'carro_modelo_gol')
    }
}

const trocaCor = (isMilitar:boolean)=>{
    if(isMilitar){
        document.body.classList.toggle('bodyMilitar')
    } else {
        document.body.classList.toggle('bodyMilitar')
    }
}

const blindagemMunicao = (isMilitar:boolean, bld:HTMLInputElement, mnc:HTMLInputElement)=>{
    if(isMilitar){
        bld.disabled = false;
        mnc.disabled = false;
    } else {
        bld.disabled = true;
        mnc.disabled = true;
    }
}

const setData = (isMilitar:boolean)=>{
    const data = {"nome" : '', "portas" : 0, "blindagem" : 0, "municao" : 0}
    let nomeValue:string = nome.value
    let portasValue:number = Number(portas.value)
    if(isMilitar){
        let blindagemValue:number = Number(blindagem.value)
        let municaoValue:number = Number(municao.value)
        data.blindagem = blindagemValue
        data.municao = municaoValue
    } 
    data.nome = nomeValue
    data.portas = portasValue
    
    return data
}

submit.addEventListener('click', (el)=>{
    el.preventDefault()
    let isMilitar:boolean = false
    
    tipos.forEach((el)=>{
        if(el.checked && el.id == 'militar'){
            isMilitar=true
            
        }
    })
    const newCar:any = setData(isMilitar)

    const newCarId:number = 2
    const newCarTipo:string = isMilitar ? 'militar':'normal'

    if(isMilitar){
        cardsMilitares.push(newCar)
        cardsConstrutor(cardsMilitares, cardsNormais)
    } else {
        cardsNormais.push(newCar)
        cardsConstrutor(cardsMilitares, cardsNormais)
    }


    fetch(`http://localhost:5000/${newCarTipo}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newCar)
    }).then((resp)=> resp.json()).then((data)=>console.log('sucesso!', data)).catch((err)=>console.log(err))
    
})
