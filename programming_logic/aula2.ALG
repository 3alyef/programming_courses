Algoritmo "Triangulo"
// Autor(a)    : Alef
// Data atual  : 26/12/2023
Var
   L1, L2, L3: Real
   EQ, ES, IS, TRI: Logico


Inicio
   Escreva("Digite o primeiro lado:")
   Leia(L1)
   Escreva("O Segundo:")
   Leia(L2)
   Escreva("O Terceiro:")
   Leia(L3)
   EQ <- (L1 = L2) e (L2 = L3)
   ES <- (L1 <> L2) e (L2 <> L3) e (L1 <> L3)
   IS <- (L1 = L2) e (L2 <> L3) ou (L1 = L3) e (L3 <> L2) ou (L2 = L3) e (L2 <> L1)
   TRI <- ((L1 + L2) > L3) e ((L1 + L3) > L2) e ((L2 + L3) > L1)
   Escreval("O trinagulo e equilatero? ", EQ)
   Escreval("O trinagulo e escaleno? ", ES)
   Escreval("O trinagulo e isoceles? ", IS)
   Escreval("Isso realmente forma um triangulo? ", TRI)
Fimalgoritmo