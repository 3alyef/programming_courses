let fazer = document.querySelector('#fazer')
let btnA = document.querySelector('#btnAdd')
let arrTD = []

let listaT = document.querySelector('.tarefL')

const dT = btnA.addEventListener('click', ()=>{
    if(fazer.value != '') {
        
        arrTD.push(fazer.value)
        fazer.value = ''
        imprimir(arrTD)

    }
})



function imprimir(arr){

    limparL()//limpa a lista

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

        const removeBtn = divC.querySelector('.delete').addEventListener('click', ()=>{
            remove(el, arr)
        })

        const confBTN = divC.querySelector('.conf').addEventListener('click', ()=>{
       
            divC.querySelector('.conf').classList.toggle('green')
            console.log(this)
          
        })

    })
}


const limparL = ()=>{
    listaT.innerHTML = ''
}

let remove = (task, arr)=>{
    for(var i = 0; i < arr.length; i++){//remove do array a task
        if(arr[i] == task){
            arr.splice(i, 1)
        } 
    }
    imprimir(arr)//imprime as tasks
}




