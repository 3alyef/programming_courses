package dio.me.aulas;

public class Aula23Exercicio {
    public static void main (String [] args){
        float salary = 70000F;
        float impost;
        float governmentSalary;
        float finalSalary;

        
        if (salary <= 0) {
            throw new IllegalArgumentException("Erro: o salário não pode ser menor ou igual a 0");
        } else if (salary <= 34712) {
            impost = 9.70F;
        } else if (salary <= 68507) {
            impost = 37.35F;
        } else {
            impost = 49.50F;
        }

        finalSalary = (float) (salary / 100) * (100 - impost);
        governmentSalary = salary - finalSalary;

        System.out.println("Salário inicial: "+salary);
        System.out.println("O total a ser pago (impostos) para o governo dos Países Baixos: "+governmentSalary);
        System.out.println("O total restante ao trabalhador: "+finalSalary);

    }
}
