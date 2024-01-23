class Carro {
    constructor(modelo, portas){
        this.modelo = modelo;
        this.portas = portas;
        this.ligado = false;
        this.vel = 0;
    };

    ligar = ()=>{
        this.ligado = true;
    };

    desligar = ()=>{
        this.ligado = false;
    };

    info = ()=>{
        console.log(`Modelo: ${this.modelo}`)
        console.log(`Portas: ${this.portas}`)
        console.log(`Ligado: ${this.ligado ? 'Sim':'Não'}`)
        if(this.ligado){
            console.log(`Velocidade: ${this.vel}`)
        }
    }
}

const car1 = new Carro('VolksWagen', 4)
