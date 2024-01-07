/*בס''ד*/

const keys = ['CE', 'C', 'DEL', '/', '7', '8', '9', 'X', '4', '5', '6','-', '1', '2', '3', '+', '0', '.', '='];

const keyboard = document.querySelector('#keyboard');
const current_operation = document.querySelector('#current-operation');
const previous_operation = document.querySelector('#previous-operation');

class Calc{
    constructor(keys, current_operation, previous_operation, keyboard){
        this.keys = keys;
        this.prep = previous_operation;
        this.cop = current_operation;
        this.keyboard = keyboard;
    };

    updateScreen(prepN, copN, tf, op, fn, ne){
        this.prepN = prepN;
        this.copN = copN;
        this.tf = tf;
        this.ne = ne;
        this.op = op;
        this.fn = fn;
        console.log(this.prepN, this.copN, this.tf, this.op, this.fn);
        if(tf){
            if(this.op == ' '){
                this.prep.textContent = this.prepN;
                this.cop.textContent = '';
                
            } else {
                this.prep.textContent = this.prepN + ` ${op}`;
                this.cop.textContent = '';
            };
           
        } else if (fn){
            this.calculator(+prepN, +copN, op, ne);
            this.fn = false;
        };
    };

    keysConstructor(){
        this.keys.map((el)=>{
            let button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('value', el);

            this.addClass(button, el); //Adiciona as classes devidas
            this.listener(button, el);

            this.keyboard.appendChild(button);
        });


        if(this.op == undefined){ //Simplifica o primeiro if de addNumb
            this.updateScreen(this.prepN, this.copN, this.tf, ' ', this.fn);
        };
    };

    addClass(button, el){
        if(!(isNaN(+el)) || el == '.'){
           button.classList = 'btns';
        } else {
            if(el == '='){
                button.classList = 'btns equal';
            } else if(!(el == '=') && !(el == '.')){
                button.classList = 'btns btns2';
            };
        };
    };

    listener(button, el){
        button.addEventListener('click', ()=>{
            if(!(isNaN(el)) || el == '.'){
                this.addNumb(el);
            } else {
                this.operat(el);
            };
        });
    };

    addNumb(el){
        if((this.op == ' ' && this.prep.textContent == '') || (this.op != ' ' && this.prep.textContent != '')){

            if(el == '.' && !(this.cop.textContent.includes('.'))){
            this.cop.textContent += el;
            } else if(!(el == '.')) {
                this.cop.textContent += el;
            };
        };
        
    };

    operat(el){
        if(el == 'CE' || el == 'C' || el == 'DEL' || el == '='){
            this.optionsCalc(el);
        } else {
            if(this.cop.textContent != '' && this.prep.textContent == ''){//deposita o valor digitado prepN (previous-operation)

                this.updateScreen(this.cop.textContent, 0, true, el, false);

            } else if(this.cop.textContent == '' && this.prep.textContent != ''){//Muda a operacao

                this.updateScreen(this.prepN, 0, true, el, false);

            } else if (this.cop.textContent != '' && this.prep.textContent != ''){ //Faz a operacao (inicio)

                this.updateScreen(this.prepN, this.cop.textContent, false, this.op, true, el);
            };
        };
    };

    calculator(prepN, copN, op, ne){
        this.operations = {    
           '+' : (a, b) => a + b,
           '-' : (a, b) => a - b,
           'X' : (a, b) => a * b,
           '/' : (a, b) => a / b
        };
        
        this.updateScreen(this.operations[op](prepN, copN), 0, true, ne, false);

    };

    optionsCalc(el){
        switch(el){
            case 'CE':
                this.cop.textContent = '';
                this.updateScreen(this.prepN, 0, true, this.op, false);
                break
            case 'C':
                this.cop.textContent = '';
                this.prep.textContent = '';
                this.updateScreen('', '', true, ' ', false);
                break;
            case 'DEL':
                this.cop.textContent = this.cop.textContent.slice(0, -1);
                break;
            default:
                if(this.cop.textContent != '' && this.prep.textContent != ''){
                    this.updateScreen(this.prepN, this.cop.textContent, false, this.op, true, ' ');
                };
                break;
        };
    };
};

const calc = new Calc(keys, current_operation, previous_operation, keyboard);
calc.keysConstructor();

//Terceira tentativa TERMINADA COM EXITO!