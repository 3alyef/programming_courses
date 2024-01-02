//sintaxe

const primeiraFuncao = ()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('esperou isso aqui')
            resolve()
        }, 1000)
    })
}

const segundaFuncao = async () => {
    console.log('iniciou')

    await primeiraFuncao()

    console.log('terminou')
}

segundaFuncao()