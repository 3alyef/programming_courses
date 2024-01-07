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

    updateScreen(proN, copN, op){
        this.proN = proN
        this.copN = copN
        this.op = op
        console.log(this.proN, this.copN, this.op)
    }

    calc(el){
        el.addEventListener('click', ()=>{
            let nop = el.value
            if(!isNaN(+nop)){
                if(this.cop.textContent.length < 16 && this.op != 0){
                    this.cop.textContent += nop
                }
            } else {
                this.operat(nop, true)
            }



        })

    }



    operat(nop, tf){
        this.tf = tf
        
        switch (nop){
            case 'CE':
                this.cop.textContent = ''
                this.updateScreen(this.proN, 0)
                break
            case 'C':
                this.prop.textContent = ''
                this.cop.textContent = ''
                this.updateScreen(0, 0, 0)
                break
            case 'DEL':
                this.cop.textContent = this.cop.textContent.slice(0, -1)
                let np = +this.cop.textContent
                this.updateScreen(this.proN, np)
                
                break
            case '/':        
            if(tf){
                    if(this.prop.textContent == ''){
                        this.prop.textContent = (this.cop.textContent + ` ${nop}`)
                        this.updateScreen(this.cop.textContent, this.copN, nop)
                        this.cop.textContent = ''
                        
                    } else if (this.cop.textContent == ''){
                        this.prop.textContent = this.prop.textContent.slice(0, -1)
                        this.prop.textContent += nop


                        this.updateScreen(this.proN, this.copN.textContent, nop)

                    } else if (!(this.prop.textContent == '') && !(this.cop.textContent == '')) {
                        this.updateScreen(this.proN, this.cop.textContent, this.op)


                    this.calculate()
                    }    
                    
                } else {
                    this.prop.textContent = (+this.proN / +this.copN)
                    this.updateScreen(0, 0, 0)
                }

                break
            case 'X':
                if(tf){
                    if(this.prop.textContent == ''){
                        this.prop.textContent = (this.cop.textContent + ` ${nop}`)
                        this.updateScreen(this.cop.textContent, this.copN, nop)
                        this.cop.textContent = ''
                         
                    } else if (this.cop.textContent == ''){
                         this.prop.textContent = this.prop.textContent.slice(0, -1)
                         this.prop.textContent += nop
    
    
                         this.updateScreen(this.proN, this.copN.textContent, nop)
    
                    } else if (!(this.prop.textContent == '') && !(this.cop.textContent == '')) {
                        this.updateScreen(this.proN, this.cop.textContent, this.op)
    
    
                       this.calculate()
                    }
    
    
                    
                        
                } else {
                    this.prop.textContent = (+this.proN * +this.copN)
                    this.updateScreen(0, 0, 0)
                }
                break
            case '-':
                if(tf){
                        if(this.prop.textContent == ''){
                            this.prop.textContent = (this.cop.textContent + ` ${nop}`)
                            this.updateScreen(this.cop.textContent, this.copN, nop)
                            this.cop.textContent = ''
                            
                        } else if (this.cop.textContent == ''){
                            this.prop.textContent = this.prop.textContent.slice(0, -1)
                            this.prop.textContent += nop
        
        
                            this.updateScreen(this.proN, this.copN, nop)
        
                        } else if (!(this.prop.textContent == '') && !(this.cop.textContent == '')) {
                            this.updateScreen(this.proN, this.cop.textContent, this.op)
        
        
                        this.calculate()
                        }       
                    } else {
                        this.prop.textContent = (+this.proN - +this.copN)
                        this.updateScreen(0, 0, 0)
                    }

                break
            case '+':
                if(tf){
                    if(this.prop.textContent == ''){
                        this.prop.textContent = (this.cop.textContent + ` ${nop}`)
                        this.updateScreen(this.cop.textContent, this.copN, nop)
                        this.cop.textContent = ''
                        
                    } else if (this.cop.textContent == ''){
                        this.prop.textContent = this.prop.textContent.slice(0, -1)
                        this.prop.textContent += nop


                        this.updateScreen(this.proN, this.cop.textContent, nop)

                    } else if (!(this.prop.textContent == '') && !(this.cop.textContent == '')) {
                        this.updateScreen(this.proN, this.cop.textContent, this.op)


                    this.calculate()
                    }
                } else {
                    this.prop.textContent = (+this.proN + +this.copN)
                    this.updateScreen(0, 0, 0)
                }

                
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


    calculate(){
        this.prop.textContent = ''
        this.cop.textContent = ''
        this.operat(this.op, false)
        
        
        
    }

}

const calculator = new calConstructor(keyboard, keys, previous_operation, current_operation)

calculator.keysConstructor()