
var p= document.createElement('p')
var select = document.querySelector('#seletor')
select.appendChild(p)


const exibir = (num)=>{
    p.innerHTML += `A operação resultou em: ${num}<br>`
}

const soma = (a, b, callback) => {
    var op = a+b;
    callback(op)
}

const mult = (a, b, cb) =>{
    var op = a*b;
    cb(op)
}

soma(2, 5, exibir)
mult(2, 5, exibir)


//clearInterval

var paragrafo = document.createElement('p')
select.appendChild(paragrafo)

var myInterval = setInterval(()=>{
    paragrafo.innerHTML += 'שלום '
}, 50)

setTimeout(()=>{
    clearInterval(myInterval);
}, 20000)