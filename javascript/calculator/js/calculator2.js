const keyboard = document.querySelector('#keyboard');
const keys = ['CE', 'C', 'DEL', '/', '7', '8', '9', 'X', '4', '5', '6','-', '1', '2', '3', '+', '0', '.', '='];
const previous_operation = document.querySelector('#previous-operation');
const current_operation = document.querySelector('#current-operation');

class calConstructor{
    constructor(keyboard, keys, previous_operation, current_operation){
        this.kb = keyboard
        this.keys = keys
        this.prop = previous_operation
        this.cop = current_operation
    }

    

    keysConstructor(){
        this.keys.map((el, i)=>{
            
            let inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'button');
            inputEl.setAttribute('value', el);
            inputEl.classList = 'btns';

            if(isNaN(+el)){ //Adicionar as Classes
                if(el === '='){
                    inputEl.classList += ' equal';
                } else if (!(el === '=') && !(el === '.') ){
                    inputEl.classList += ' btns2';
                }
            }

            this.calc(inputEl);
            

            this.kb.appendChild(inputEl);


        })
    }

    updateScreen(proN, copN){
        this.proN = proN
        this.copN = copN
        console.log(this.proN, this.copN)
    }

    calc(el){
        el.addEventListener('click', ()=>{
            let nop = el.value
            if(!isNaN(+nop)){
                if(this.cop.textContent.length < 16){
                    this.cop.textContent += nop
                }
            } else {
                this.operat(nop)
            }



        })

    }



    operat(nop){
        
        switch (nop){
            case 'CE':
                this.cop.textContent = ''
                this.updateScreen(this.proN, 0)
                break
            case 'C':
                this.prop.textContent = ''
                this.cop.textContent = ''
                this.updateScreen(0, 0)
                break
            case 'DEL':
                this.cop.textContent = this.cop.textContent.slice(0, -1)
                let np = +this.cop.textContent
                this.updateScreen(this.proN, np)
                
                break
            case '/':

                break
            case 'X':

                break
            case '-':

                break
            case '+':

                break
            case '.':
                if(!this.cop.textContent.includes('.')){
                    this.cop.textContent += nop
                }
                break
            case '=':

                break
        }
    }

}

const calculator = new calConstructor(keyboard, keys, previous_operation, current_operation)

calculator.keysConstructor()