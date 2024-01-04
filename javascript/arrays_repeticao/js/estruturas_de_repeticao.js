const names = ["Alef", "Avraham", "Itzkhaq", "Yaqov", "Mosheh", "David", "Shlomo"]

const input = document.createElement('input')
input.setAttribute('type', 'text')
input.classList = 'text'
const btnInput = document.createElement('input')
btnInput.setAttribute('type', 'button')
btnInput.setAttribute('value', 'Search')

document.body.appendChild(input)
document.body.appendChild(btnInput)


let btns = btnInput.addEventListener('click', ()=>{
    const name = document.body.querySelector('.text').value
    let i = 0
    let tf = false
    names.forEach((el)=>{
        i++
        if(el.toUpperCase() == name.toUpperCase()){
            console.log(`Nome encontrado na base de dados`)
            tf=true
        }else if(names.length == i && tf==false){
            console.log('Nome não encontrado na base de dados!')
            tf=true
        }
    })
})
