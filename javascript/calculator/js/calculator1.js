const keyboard = document.querySelector('#keyboard');
const keys = ['CE', 'C', 'DEL', '/', '7', '8', '9', 'X', '4', '5', '6','-', '1', '2', '3', '+', '0', '.', '='];
const previous_operation = document.querySelector('#previous-operation');
const current_operation = document.querySelector('#current-operation');

const start = ()=>{
    const Constructor = new CalConstructor(keys, keyboard, previous_operation, current_operation);

    Constructor.keysConstructor()
  
}







class CalConstructor {
    constructor(keys, keyboard, pro, cop){
        this.keysBtn = keys;
        this.keyboardB = keyboard;
        this.pro = pro;
        this.cop = cop;
        
    }

    

    keysConstructor() {
        this.keysBtn.map((el, i)=>{
        
            let inputbtn = document.createElement('input');
            inputbtn.setAttribute('type', 'button');
            inputbtn.setAttribute('value', el);
            inputbtn.classList = 'btns';
            
    
            this.addClasses(inputbtn, el, i);
            
            inputbtn.addEventListener('click', ()=>{
                
                if(!isNaN(+el)){ //verifica se é um number
                    this.numberOp(el)
                } else {
                    this.operations(el)
                }

                
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


    updateScreen = (op1, operation, current, previous) =>{}

    operations = (el)=>{
        switch(el){
            case 'CE':
                break

            case 'C':
                this.cop.textContent = ''
                this.pro.textContent = ''
                break

            case 'DEL':
                this.cop.textContent = this.cop.textContent.slice(0, -1)
                break

            case '/':
                break

            case 'X':
                break
            
            case '-':
                break

            case '+':
                break

            case '=':
                break
        }
    }

    numberOp = (el)=>{
        if(this.cop.textContent.length <= 16){
            this.cop.textContent += el
        }
        
    }
}


start()

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




case '1':
          
                break
            case '2':

                break
            case '3':

                break
            case '4':
            
                break
            case '5':

                break
            case '6':

                break
            case '7':

                break
            case '8':

                break
            case '9':

                break
            case '0':
                
                break
*/