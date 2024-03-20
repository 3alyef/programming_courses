package dio.me.aulas;

public class Aula26Exercicio {
    public static void main (String [] args){

        /*
         * Crie um programa com SWITCH que retorne se é dia útil ou não 
         * considerando 1 como domingo
         */

        int dia = 1;

        

        switch (dia) {
            case 1:
                System.out.println("יום ראשון");
                break;
            case 2:
                System.out.println("יום שני");
                break;
            
            case 3:
                System.out.println("יום שלישי");
                break;
            case 4:
                System.out.println("יום רביעי");
                break;           
            case 5:
                System.out.println("יום חמישי");
                break;
            case 6:
                System.out.println("יום שישי");
                break;
            case 7:
                System.out.println("יום שבת");
                break;
            default:
                break;
        }
    }
}