"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aula31_1 = require("./aula31");
var Veiculos;
(function (Veiculos) {
    let Cores;
    (function (Cores) {
        Cores[Cores["Black"] = 0] = "Black";
        Cores[Cores["white"] = 1] = "white";
        Cores[Cores["Red"] = 2] = "Red";
        Cores[Cores["Yellow"] = 3] = "Yellow";
        Cores[Cores["Blue"] = 4] = "Blue";
    })(Cores || (Cores = {}));
    ;
    class Carro {
        nome;
        motor;
        cor;
        constructor(nome, motor, cor) {
            this.motor = motor;
            this.nome = nome;
            this.cor = Cores[cor];
            (0, aula31_1.Teste)("'Adon 'Ekhadh Ushmo 'Ekhadh L'3olam Va'3edh!");
        }
        ;
        info() {
            console.log(`Nome: ${this.meuNome}`);
            console.log(`Potência: ${this.minhaPotencia}`);
            console.log(`Cor: ${this.minhaCor}`);
            console.log(`Ligado: ${this.estouLigado}`);
            console.log(`-----------------------------------------------`);
        }
        ;
        ligar() {
            this.motor.liga = true;
        }
        ;
        desligar() {
            this.motor.liga = false;
        }
        ;
        get minhaCor() {
            return this.cor;
        }
        ;
        get meuNome() {
            return this.nome;
        }
        ;
        get estouLigado() {
            return (this.motor.liga ? 'Sim' : 'Não');
        }
        ;
        get minhaPotencia() {
            return this.motor.potencia;
        }
    }
    ;
    class CarroEsportivo extends Carro {
        constructor(nome, cor) {
            super(nome, new Motores.NormalMotor(6, 300, new Motores.Turbo(500)), cor);
        }
    }
    Veiculos.CarroEsportivo = CarroEsportivo;
    ;
    class CarroPopular extends Carro {
        constructor(nome, cor) {
            super(nome, new Motores.NormalMotor(100, 100), cor);
        }
    }
    Veiculos.CarroPopular = CarroPopular;
})(Veiculos || (Veiculos = {}));
;
var Motores;
(function (Motores) {
    class Turbo {
        pot;
        constructor(pot) {
            this.pot = pot;
        }
        ;
        get potencia() {
            return this.pot;
        }
    }
    Motores.Turbo = Turbo;
    class NormalMotor {
        ligado;
        cilindros;
        pot;
        constructor(pot, cilindros, turbo) {
            this.ligado = false;
            this.cilindros = cilindros;
            this.pot = pot + (turbo ? turbo.potencia : 0);
        }
        set liga(ligado) {
            this.ligado = ligado;
        }
        get liga() {
            return this.ligado;
        }
        get potencia() {
            return this.pot;
        }
    }
    Motores.NormalMotor = NormalMotor;
})(Motores || (Motores = {}));
const c1 = new Veiculos.CarroEsportivo('BMW', 2);
const c2 = new Veiculos.CarroPopular('Gol', 3);
c1.info();
c2.info();
