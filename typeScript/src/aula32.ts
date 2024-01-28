import {Teste} from './aula31'


namespace Veiculos{

    enum Cores{
        'Black',
        'white',
        'Red',
        'Yellow',
        'Blue'
    };
    
        abstract class Carro{
        private nome:string;
        private motor:Motores.NormalMotor;
        private cor:String;
        constructor(nome:string, motor:Motores.NormalMotor, cor:Cores){
           
            this.motor = motor;
            this.nome = nome;
            this.cor = Cores[cor];
            Teste("'Adon 'Ekhadh Ushmo 'Ekhadh L'3olam Va'3edh!");
        };

        info(){
            console.log(`Nome: ${this.meuNome}`);
            console.log(`Potência: ${this.minhaPotencia}`);
            console.log(`Cor: ${this.minhaCor}`)
            console.log(`Ligado: ${this.estouLigado}`)
            console.log(`-----------------------------------------------`)
            
        };

        public ligar(){
            this.motor.liga=true
        };
        public desligar(){
            this.motor.liga=false
        };
        get minhaCor(){
            return this.cor
        };
        get meuNome(){
            return this.nome
        };
        get estouLigado(){
            return (this.motor.liga?'Sim':'Não')
        };
        get minhaPotencia(){
            return this.motor.potencia
        }


    };

    export class CarroEsportivo extends Carro{
        constructor(nome:string, cor:Cores ){
            super(nome, new Motores.NormalMotor(6, 300, new Motores.Turbo(500)), cor)
        }
    };

    export class CarroPopular extends Carro{
        constructor(nome:string, cor:Cores ){
            super(nome, new Motores.NormalMotor(100, 100), cor)
        }
    }

};

namespace Motores {
    export class Turbo {
        private pot:number;
        constructor(pot:number){
            this.pot = pot;
        };
        get potencia(){
            return this.pot;
        }
    }

    export class NormalMotor{
        private ligado:boolean;
        private cilindros:number;
        pot:number;
        constructor(pot:number, cilindros:number, turbo?:Turbo){
            this.ligado = false;
            this.cilindros = cilindros;
            this.pot = pot + (turbo?turbo.potencia:0);

        }

        set liga(ligado:boolean){
            this.ligado = ligado
        }

        get liga(){
            return this.ligado
        }

        get potencia(){
            return this.pot
        }

        


    }
}

const c1 = new Veiculos.CarroEsportivo('BMW', 2)
const c2 = new Veiculos.CarroPopular('Gol', 3)

c1.info()
c2.info()