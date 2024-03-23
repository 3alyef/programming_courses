package javacore.introducaoclasses.test;
import javacore.introducaoclasses.dominio.Carro;
public class CarroTest {
    public static void main (String [] args){
        Carro carro1 = new Carro();

        carro1.ano = 2010;
        carro1.modelo = "VolksWagen";
        carro1.nome = "Delta 1";

        System.out.println(carro1.ano);
        System.out.println(carro1.modelo);
        System.out.println(carro1.nome);
    }
}
