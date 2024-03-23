package java_aulas.aulas.methods.domain;

public class Funcionarios {
    private String nome;
    private int idade;
    private double salary;

    public Funcionarios(String nome, int idade, double salary){ // Lembre-se o metódo constructor de uma class java sempre será nomeada de acordo com o nome da class da mesma.
        this.nome = nome;
        this.idade = idade;
        this.salary = salary;
    }

    public String getNome(){
        return this.nome;
    }

    public int getIdade(){
        return this.idade;
    }

    public double getSalary(){
        return this.salary;
    }
 

    public void setNome(String nome){
        this.nome = nome;
    }

    public void setIdade(int idade){
        this.idade = idade;
    }

    public void setSalary(double salary){
        this.salary = salary;
    }
    
}
