const keyboard = document.querySelector('#keyboard')
const keys = ['CE', 'C', 'DEL', '/', '7', '8', '9', 'X', '4', '5', '6','-', '1', '2', '3', '+', '0', '.', '=']

const start = window.onload = ()=>{
    const keysConstructor = new CalConstructor(keys, keyboard)
    keysConstructor.keysConstructor()
  
}




class CalConstructor {
    constructor(keys, keyboard){
        this.keysBtn = keys;
        this.keyboardB = keyboard;
    }

    keysConstructor() {
        this.keysBtn.map((el, i)=>{
        
            let inputbtn = document.createElement('input');
            inputbtn.setAttribute('type', 'button');
            inputbtn.setAttribute('value', el);
            inputbtn.classList = 'btns';
            
    
            this.addClasses(inputbtn, el, i);
            
            inputbtn.addEventListener('click', ()=>{
                console.log(el);
            })
    
    
            this.keyboardB.appendChild(inputbtn);
            
            
        })
    }

    addClasses = (inputbtn, el, i) =>{
        if(el === '=') {
            inputbtn.classList += ' equal';
    
        } else if (i <= 3 || el == 'X' || el == '-' || el == '+') {
            inputbtn.classList += ' btns2';
        }
    
    }


}




/* COM FUNÇÕES 
const keysConstructor = (arr, kb) =>{
    arr.map((el, i)=>{
        
        let inputbtn = document.createElement('input')
        inputbtn.setAttribute('type', 'button')
        inputbtn.setAttribute('value', el)
        inputbtn.classList = 'btns'
        

        addClasses(inputbtn, el, i)
        
        inputbtn.addEventListener('click', ()=>{
            console.log(el)
        })


        kb.appendChild(inputbtn)
        
        
        
        
    })
}

const addClasses = (inputbtn, el, i) =>{
    if(el === '=') {
        inputbtn.classList += ' equal'

    } else if (i <= 3 || el == 'X' || el == '-' || el == '+') {
        inputbtn.classList += ' btns2'
    }

}

keysConstructor(keys, keyboard)

*/