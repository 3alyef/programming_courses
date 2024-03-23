package java_aulas.aulas.methods.tests;

import java_aulas.aulas.methods.domain.Funcionarios;
import java_aulas.aulas.methods.methods.ImprimirDataFuncionarios;
import java_aulas.aulas.methods.methods.MediaSalary;

public class FuncionariosTest {
    public static void main(String []args){
        Funcionarios funcionario1 = new Funcionarios("Avraham", 25, 1500.50);
        Funcionarios funcionario2 = new Funcionarios("Sarah", 26, 1500.50);
        ImprimirDataFuncionarios Imprimir = new ImprimirDataFuncionarios();
        MediaSalary media = new MediaSalary();
        Imprimir.showInformations(funcionario1);
        media.media(funcionario1.getSalary(), funcionario2.getSalary());
    }

   
}
