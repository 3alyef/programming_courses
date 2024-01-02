//Criação de promise

const myPromise = new Promise((resolve, reject)=>{
    const name = 'Alef'

    if(name === 'Alef') {
        resolve('Usuário Alef encontrado!')
    } else {
        reject('O usuário Alef não foi encontrado')
    }
})

myPromise.then((data) => {
    console.log(data)
})

//Encadeamento de promises


const myPromise2 = new Promise((resolve, reject)=>{
    const name = 'Alef'

    if(name === 'Alef') {
        resolve('Usuário Alef encontrado!')
    } else {
        reject('O usuário Alef não foi encontrado')
    }
})

myPromise2.then((data) => {
    return data.toUpperCase()

}).then((stringModificado)=>{
    console.log(stringModificado)
})

//Retorno do catch

const myPromise3 = new Promise((resolve, reject)=>{
    const name = 'Alef'

    if(name === 'Avraham') {
        resolve('Usuário Alef encontrado!')
    } else {
        reject('O usuário Alef não foi encontrado')
    }
})

myPromise3.then((data) => {
    console.log(data)

}).catch((err) =>{
    console.log('Aconteceu um erro: '+ err)
})

//Resolver várias Promises


const p1 = new Promise((resolve, reject)=>{
   

    setTimeout(()=>{
        resolve('P1 ok!')
    }, 2000)

})

const p2 = new Promise((resolve, reject)=>{
    resolve('P2 ok!')

})

const p3 = new Promise((resolve, reject)=>{
    resolve('P2 ok!')

})

const resolveAll = Promise.all([p1, p2, p3]).then((data)=>{
    console.log(data)
})

//race

const resolveRace = Promise.race([p1, p2, p3]).then((data)=>{
    console.log(data)
})


//Fetch request na API do GitHub
//Fetch API

const userName = 'alefalves4867'

fetch(`https://api.github.com/users/${userName}`, {
    method: 'GET',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
}).then((response)=>{
    console.log(typeof response)
    console.log(response)
    return response.json()
}).then((data)=>{
    console.log(`O nome do usuário é : ${data.name}`)
}).catch((err)=>{
    console.log('Houve algum erro' + err)
})