const heb = document.getElementById('he')
heb.textContent = 'hello'
const par = document.createElement('p')
heb.appendChild(par)
var a = document.createTextNode('oi')
par.appendChild(a)