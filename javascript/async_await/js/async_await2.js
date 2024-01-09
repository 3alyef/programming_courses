//sintaxe

function text(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('שלום')
            resolve()
        }, 1000)
    })
}

async function first(){
    console.log('Hello')
    await text()
    console.log('Hallo!') 
}

first()