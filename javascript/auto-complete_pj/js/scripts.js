const addressForm = document.querySelector("#address-form")
const cepInput = document.querySelector("#cep")
const addressInput = document.querySelector("#address")
const cityInput = document.querySelector("#city")
const neighborhoodInput = document.querySelector("#neighborhood")
const regionInput = document.querySelector('#region')
const formInputs = [...document.querySelectorAll('[data-input]')]
const fadeElement = document.querySelector('#fade')
const closeButton = document.querySelector("#close-message")

// Validate CEP Input

cepInput.addEventListener("keypress", (e)=>{
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode)
   

    // allow only Numbers 

    if(!onlyNumbers.test(key)){
        e.preventDefault()
        return
    }
})

// Get adress event

cepInput.addEventListener('keyup', (e)=>{
    const inputValue = e.target.value

    // Check if we have the correct length
    if(inputValue.length === 8){
        getAddress(inputValue)
    }
})

// Get customer address from API
const getAddress = async (cep)=>{

    toggleLoader()

    cepInput.blur()


    const apiURL = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiURL)
    const data = await response.json()

    // Show error and reset form
    
    if(data.erro){

        if(!addressInput.hasAttribute('disabled')){
            toggleDisabled()
        }
        addressForm.reset()
        toggleLoader()
     
        // Show message
        toggleMessage("CEP inválido, tente novamente.")
        return
    }
    if(addressInput.value === ''){
        toggleDisabled()
    }
    addressInput.value = data.logradouro
    cityInput.value = data.localidade
    neighborhoodInput.value = data.bairro
    regionInput.value = data.uf
    toggleLoader()
    
}

// Add or remove disabled attribute

const toggleDisabled = () =>{
    if(regionInput.hasAttribute("disabled")){
        formInputs.map((e)=>{
            e.removeAttribute('disabled')
        })
    } else {
        formInputs.map((e)=>{
            e.setAttribute('disabled', 'disabled')
        })
    }
}

//Show or hide loader 

const toggleLoader = () =>{
  
    const loaderElement = document.querySelector('#loader')

    fadeElement.classList.toggle('hide')
    loaderElement.classList.toggle('hide')
}

// Show or hide message
const toggleMessage = (msg)=>{
    const messageElement = document.querySelector('#message')

    const messageElementText = document.querySelector('#message p')
    
    messageElementText.textContent = msg

    fadeElement.classList.toggle('hide')
    messageElement.classList.toggle('hide')
}


// Close message modal 

closeButton.addEventListener('click', ()=>{
    toggleMessage()
    cepInput.focus()
})



// Save address

addressForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    toggleLoader()

    setTimeout(()=>{
        toggleLoader()
        toggleMessage("Endereço salvo com sucesso!")
        addressForm.reset()
        toggleDisabled()
    }, 1500)
})