const btnAdd = document.querySelector("#btnAdd")
const fazer = document.querySelector('#fazer')
let tarefas = []
let tarefL = document.querySelector('.tarefL')
let btnConf = document.querySelectorAll('.conf')
let btnC = [...btnConf]
btnAdd.addEventListener('click', ()=>{
    if(fazer.value != '') {
        console.log('antes'+btnC)
        tarefas.push(fazer.value)
        fazer.value = ''
        //console.log(tarefas)
        
        remover()
        imprimir(tarefas, tarefL)
        console.log('depois'+ btnC)
        
        
        
    } else {
        window.alert('Digite algo!')
    }
   
})


btnC.map((el)=>{
    el.addEventListener('click', ()=>{
      
        el.classList.toggle('green')
        console.log(btnC)
    })
})



var imprimir = (arr, father)=>{

    for(var i = 0; i < arr.length; i++) {
        //console.log('valor de entrada arr: ' + arr[i])

        let Ldiv = document.createElement('div')//Lista principal

        Ldiv.classList = 'Ldiv'
        let p = document.createElement('p')
        p.textContent = arr[i]
        Ldiv.appendChild(p)

        let list = document.createElement('div')//lista e botões

        list.classList = 'list'

        let btnC = document.createElement('input')//botão confirmar

        btnC.setAttribute('type', 'button')
        btnC.setAttribute('value', 'cf')
        btnC.classList = 'conf'
        list.appendChild(btnC)

        let btnAP = document.createElement('input')//botão apagar

        btnAP.setAttribute('type', 'button')
        btnAP.setAttribute('value', 'ap')
        btnAP.classList = 'delete'
        list.appendChild(btnAP)

        Ldiv.appendChild(list)//Adiciona a lista de botões a lista principal


        father.appendChild(Ldiv) //Adiciona a lista principal a lista pai (afazeres)
       
    }
}

var remover = ()=>{ //Limpa a lista
    var Ldiv = document.querySelectorAll('.Ldiv')
    for(var i = Ldiv.length - 1; i>=0; i--){
        Ldiv[i].remove()
    }
}