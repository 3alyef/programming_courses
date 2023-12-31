let fazer = document.querySelector('#fazer')
let btnA = document.querySelector('#btnAdd')
let arrTD = []

let listaT = document.querySelector('.tarefL')







let dT = btnA.addEventListener('click', ()=>{
    

    if(fazer.value != '') {
        remover()
        arrTD.push(fazer.value)
        fazer.value = ''
        imprimir(arrTD)


        

        
        
    } else {
        window.alert('Digite algo!')
    }

    let inf = atualizar()

    
    
    


})


dT.values()


let atualizar= () =>{
    let btnC = [...document.querySelectorAll('.conf')]
    let btnDL = [...document.querySelectorAll('.delete')]
    return [btnC, btnDL]
}




let remover = ()=>{
    listaT.innerHTML = ''
}






let imprimir = (arr) =>{
    arr.map((el)=>{
        let divC = document.createElement('div')
        divC.classList = 'Ldiv'

        let p = document.createElement('p')
        p.textContent = el

        divC.appendChild(p)




        let listC = document.createElement('div')
        listC.classList = 'list'

        let inputC = document.createElement('input')
        inputC.setAttribute('type', 'button')
        inputC.setAttribute('value', 'cf')
        inputC.classList = 'conf'
        
        listC.appendChild(inputC)

        let inputD = document.createElement('input')
        inputD.setAttribute('type', 'button')
        inputD.setAttribute('value', 'ap')
        inputD.classList = 'delete'
        
        listC.appendChild(inputD)

        

        divC.appendChild(listC)
        listaT.appendChild(divC)

    })
}


