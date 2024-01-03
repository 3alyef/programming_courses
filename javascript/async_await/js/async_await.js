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



//Exemplo

const getUser = (id) =>{
    return fetch(`https://reqres.in/api/users?id=${id}`).then(data=>data.json()).catch(err=>console.log(err))
}

const showUserName = async (id)=>{
    

    try {
        const user = await getUser(id)
        console.log(`O nome do usuário é: ${user.data.first_name}`)
    }catch(err){
        console.log(`Erro: ${err}`)
    }
}

showUserName(10)