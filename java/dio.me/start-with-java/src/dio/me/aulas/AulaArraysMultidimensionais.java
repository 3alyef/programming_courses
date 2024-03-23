package dio.me.aulas;

public class AulaArraysMultidimensionais {
    public static void main (String [] arg){
        int[][] dias = new int[3][3];

        dias[0][0] = 10;
        dias[0][1] = 20;
        dias[0][2] = 30;

        dias[1][0] = 40;
        dias[1][1] = 50;
        dias[1][2] = 60;

        dias[2][0] = 70;
        dias[2][1] = 80;
        dias[2][2] = 90;

        for(int i = 0; i < dias.length; i++){

            for(int j = 0; j < dias[i].length; j++){
                System.out.println(dias[i][j]);
            }
        }

        /**
        *  <p>Pelo que percebi no laço acima, o ideal é utilizar i como interador   em dias[i]</p>
        */
    }
}
