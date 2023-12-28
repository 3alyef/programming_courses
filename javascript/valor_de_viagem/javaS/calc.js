
let btn = document.querySelector('#btn')
let cs = document.querySelector('#cs')
let btnR = btn.addEventListener('click', ()=>{
    var vl = +document.querySelector('#cb').value
    var gk = +document.querySelector('#gk').value
    var dkv = +document.querySelector('#dkv').value
    if(vl > 0 && gk > 0 && dkv > 0){
        let resulF = (dkv/gk) * vl
        cs.textContent = resulF.toFixed(2)
    } else {
        window.alert('Números Invalidos!')
    }
    
})
