package java_aulas.aulas.methods.methods;
import java_aulas.aulas.methods.domain.Funcionarios;;

public class ImprimirDataFuncionarios {
    public void showInformations(Funcionarios test){
        System.out.println("Nome: "+ test.getNome());
        System.out.println("Idade: "+ test.getIdade());
        System.out.println("Salário: "+ test.getSalary());
    }
}
