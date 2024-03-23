package javacore.introducaoclasses.test;
import javacore.introducaoclasses.dominio.Estudante;

public class EstudanteTest0 {
    public static void main (String [] args){
        Estudante estudante0 = new Estudante();
        estudante0.nome = "Alef";
        estudante0.idade = 18;
        estudante0.sexo = 'M';


        System.out.println(estudante0.nome);
        System.out.println(estudante0.idade);
        System.out.println(estudante0.sexo);
    }
}
