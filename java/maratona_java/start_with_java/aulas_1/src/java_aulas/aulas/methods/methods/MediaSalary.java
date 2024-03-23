package java_aulas.aulas.methods.methods;

public class MediaSalary {
    public void media(double... nums){
        double soma = 0;
        for(double num: nums){
            soma += num;
        }

        double media = soma / nums.length;

        System.out.println("A media é: "+ media);
    }
}
