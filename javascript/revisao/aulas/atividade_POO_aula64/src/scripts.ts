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



const updateServerRemove = (id:string, type:string)=>{
    fetch(`http://localhost:5000/${type.toLowerCase()}/${id}`, {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    }).then((resp)=>resp.json()).catch((error)=>console.log(error))

    console.log(id)
}

const removerCard = (card:HTMLElement, type:string)=>{

    if(type === 'Militar'){
        
        let index:number = Number(card.dataset.index)
        updateServerRemove(cardsMilitares[index].id, type)
        cardsMilitares.splice(index, 1)
        
    } else {
        
        let index:number = Number(card.dataset.index)
        updateServerRemove(cardsNormais[index].id, type)
        cardsNormais.splice(index, 1)
        
    }
    
    
    cardsConstrutor(cardsNormais, cardsMilitares)
    
    
}



const reporData = (card:HTMLElement)=>{
    if(card.querySelector('.type')?.textContent == 'Militar'){
        const obj = cardsMilitares[Number(card.dataset.index)]
        
        nome.value = obj.nome
        portas.value = obj.portas
        blindagem.value = obj.blindagem
        municao.value = obj.municao
    } else {
        const obj = cardsNormais[Number(card.dataset.index)]
        
        nome.value = obj.nome
        portas.value = obj.portas
       
    }
}

const editarCard = (card:HTMLElement, type:string)=>{
    if(type === 'Militar'){

        
        trocaImagem(imgs, true)
        trocaCor(true)
        blindagemMunicao(true, blindagem, municao)
        submit.value = 'Atualizar'
        submit.dataset.eleditid = card.id
        submit.dataset.cardtype = type
        reporData(card)
        tipos.forEach((el)=>{
            if(el.id == 'militar'){
                el.checked = true
            }
            el.disabled = true
        })
    } else {
        trocaImagem(imgs, false)
        trocaCor(false)
        blindagemMunicao(false, blindagem, municao)
        submit.value = 'Atualizar'
        submit.dataset.eleditid = card.id
        submit.dataset.cardtype = type
        reporData(card)
        tipos.forEach((el)=>{
            if(el.id == 'normal'){
                el.checked = true
            }
            el.disabled = true
        })
    }
}

const btnsFuncoes = (btn:HTMLInputElement, card:HTMLElement, type:string)=>{
    
    btn.addEventListener('click', ()=>{
        if(btn.value === 'Remover'){
           removerCard(card, type)
           
        } else {
            editarCard(card, type)

        }
    })
    
}





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

const cardGenerator = (el:any, type:string, id:string, index:number)=>{
    const info = document.createElement('div')
    info.setAttribute('class', 'info')
    const nomeL = document.createElement('p')
    nomeL.textContent = `Nome: ${el.nome}`
    const portasL = document.createElement('p')
    portasL.textContent = `Portas: ${el.portas}`
    const blindagemL = document.createElement('p')
    blindagemL.textContent = `Blindagem: ${el.blindagem}`
    const municaoL = document.createElement('p')
    municaoL.textContent = `Munição: ${el.municao}`

    info.appendChild(nomeL)
    info.appendChild(portasL)
    info.appendChild(blindagemL)
    info.appendChild(municaoL)


    const btns = document.createElement('div')
    btns.setAttribute('class', 'btnsContainer')

    const remover = document.createElement('input')
    remover.setAttribute('type', 'button')
    remover.setAttribute('value', 'Remover')
    remover.setAttribute('class', 'btns')
    remover.classList.add('btnsRemover')
    
    

    const editar = document.createElement('input')
    editar.setAttribute('type', 'button')
    editar.setAttribute('value', 'Editar')
    editar.setAttribute('class', 'btns')
    editar.classList.add('editarBtns')
    

    btns.appendChild(remover)
    btns.appendChild(editar)

    const title = document.createElement('p')
    title.textContent = type
    title.setAttribute('class', 'type')

    const card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('data-index', String(index))
    card.setAttribute('id', String(id))

    card.appendChild(title)
    card.appendChild(info)
    card.appendChild(btns)
    btnsFuncoes(remover, card, type)
    btnsFuncoes(editar, card, type)
    return card
}

const cardsConstrutor = (normais:any[], militares:any[]) => {
    showMilitit.innerHTML = ''
    showNormal.innerHTML = ''
    normais.forEach((el, i)=>{
        const card = cardGenerator(el, 'Normal', el.id, i)
        showNormal.appendChild(card)
    })

    militares.forEach((el, i)=>{
        const card = cardGenerator(el, 'Militar', el.id, i)
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
        document.body.classList.add('bodyMilitar')
    } else {
        document.body.classList.remove('bodyMilitar')
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


const updateServer = (type: string, id:string, object:object)=>{

    fetch(`http://localhost:5000/${type.toLowerCase()}/${id}`, {
        method: 'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(object)
    }).then((resp)=>resp.json()).then((data)=>console.log(data)).catch((error)=>console.log(error))

}

const updateData = (id:string, type:string)=>{

    let newName =  nome.value 
    let newPortas = portas.value
    let newblindagem = blindagem.value
    let newMunicao = municao.value 

    nome.value = ''
    portas.value = ''
    blindagem.value = ''
    municao.value = ''
    
    let index:number = 0
    let objUpdate = {"id":"", "nome":"", "portas":"", "blindagem":"", "municao":""}
    
    if(type==='Militar'){  
        cardsMilitares.forEach((el, i)=>{
            if(el.id === id) index = i
        })
        objUpdate.id = id
        objUpdate.nome = newName
        objUpdate.portas = newPortas
        objUpdate.blindagem = newblindagem
        objUpdate.municao = newMunicao

        cardsMilitares[index] = objUpdate

        updateServer(type, id, objUpdate)
        
    } else {
        cardsNormais.forEach((el, i)=>{
            if(el.id === id) index = i
        })
        objUpdate.id = id
        objUpdate.nome = newName
        objUpdate.portas = newPortas
        objUpdate.blindagem = newblindagem
        objUpdate.municao = newMunicao

        cardsNormais[index] = objUpdate

        updateServer(type, id, objUpdate)
        
    }


    cardsConstrutor(cardsNormais, cardsMilitares)
    
}

submit.addEventListener('click', (el)=>{
    el.preventDefault()
    let elemento = el.target as HTMLInputElement
   
    if(elemento.value === 'Adicionar'){
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

    } else {

        const elementId = String(elemento.dataset.eleditid)
        const cardType = String(elemento.dataset.cardtype)
        elemento.dataset.eleditid = ''
        elemento.dataset.cardtype = ''
        elemento.value = 'Adicionar'
        
        tipos.forEach((el)=>{
            el.disabled = false
        })

        updateData(elementId, cardType)

    }
    
    
})


