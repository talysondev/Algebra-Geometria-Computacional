import Matrix from "./Matrix.js";
import Vector from "./Vector.js";
import LinearAlgebra from "./LinearAlgebra.js";

const algebra = new LinearAlgebra();


// FUNÇÃO PARA MOSTRAR MATRIZES DE FORMA ORGANIZADA
function mostrarMatrix(matriz) {
    for (let i = 0; i < matriz.rows; i++) {
        let linha = [];

        for (let j = 0; j < matriz.cols; j++) {
            linha.push(matriz.get(i, j));
        }

        console.log("[ " + linha.join("  ") + " ]");
    }
}


// TESTE MATRIX

const A = new Matrix(
    2,
    2,
    [1, 2, 3, 4]
);

const B = new Matrix(
    2,
    2,
    [5, 6, 7, 8]
);

console.log("Matriz A:");
mostrarMatrix(A);

console.log("\nMatriz B:");
mostrarMatrix(B);


// TESTE GET

console.log("\nA.get(1, 0):");
console.log(A.get(1, 0));


// TESTE SET

A.set(1, 0, 10);

console.log("\nApós set:");
mostrarMatrix(A);


// TESTE SOMA

const soma = algebra.sum(A, B);

console.log("\nSoma:");
mostrarMatrix(soma);


// TESTE TIMES

const multiplicacaoElemento = algebra.times(A, B);

console.log("\nTimes:");
mostrarMatrix(multiplicacaoElemento);


// TESTE DOT

const multiplicacaoMatrizes = algebra.dot(A, B);

console.log("\nDot:");
mostrarMatrix(multiplicacaoMatrizes);


// TESTE TRANSPOSTA

const transposta = algebra.transpose(A);

console.log("\nTransposta:");
mostrarMatrix(transposta);


// TESTE VETORES

const v1 = new Vector(
    3,
    [1, 2, 3]
);

const v2 = new Vector(
    3,
    [4, 5, 6]
);

console.log("\nVetor 1:");
console.log(v1.elements);

console.log("\nVetor 2:");
console.log(v2.elements);


// TESTE GET (vetor)

console.log("\nv1.get(1):");
console.log(v1.get(1));


// TESTE SET (vetor)

v1.set(1, 10);

console.log("\nApós set:");
console.log(v1.elements);


// TESTE SOMA (vetor)

const somaVetores = algebra.sum(v1, v2);

console.log("\nSoma dos vetores:");
console.log(somaVetores.elements);


// TESTE TIMES (vetor)

const timesVetores = algebra.times(v1, v2);

console.log("\nTimes dos vetores:");
console.log(timesVetores.elements);


// TESTE GAUSS

const matrizGauss = new Matrix(
    3,
    4,
    [
       2, 2, 2, 10,
        4, 6, 2, 18,
        0, 2, 4, 10
    ]
);

console.log("\nMatriz usada no Gauss:");
mostrarMatrix(matrizGauss);

const resultadoGauss = algebra.gauss(matrizGauss);

console.log("\nResultado do Gauss:");
mostrarMatrix(resultadoGauss);


// TESTE SOLVE

const matrizSistema = new Matrix(
    2,
    3,
    [
        1, 1, 5,
        2, 1, 7
    ]
);

console.log("\nMatriz aumentada do sistema:");
mostrarMatrix(matrizSistema);

const solucao = algebra.solve(matrizSistema);

console.log("\nSolução do sistema:");
mostrarMatrix(solucao);


// SISTEMA IMPOSSÍVEL

const sistemaImpossivel = new Matrix(
    2,
    3,
    [
        1, 1, 2,
        1, 1, 3
    ]
);

console.log("\nSistema impossível:");
mostrarMatrix(sistemaImpossivel);

try {

    const solucaoImpossivel = algebra.solve(sistemaImpossivel);

    mostrarMatrix(solucaoImpossivel);

} catch (erro) {

    console.log(erro.message);
}


// SISTEMA INDETERMINADO (INFINITAS SOLUÇÕES)

const sistemaIndeterminado = new Matrix(
    2,
    3,
    [
        1, 1, 2,
        2, 2, 4
    ]
);

console.log("\nSistema indeterminado:");
mostrarMatrix(sistemaIndeterminado);

try {

    const solucaoIndeterminada = algebra.solve(sistemaIndeterminado);

    mostrarMatrix(solucaoIndeterminada);

} catch (erro) {

    console.log(erro.message);
}

// =====================================================
// AV2 - TESTES DE TRANSLAÇÃO EM COORDENADAS HOMOGÊNEAS
// =====================================================
import Tranformations from "./Transformation.js";

const transformacoes = new Tranformations();

const ponto2D = new Vector(2, [1, 2]);
const ponto2DMovido = transformacoes.translate2D(ponto2D, 3, 1);
console.log("\nAV2 - Translação 2D:");
console.log("Original:", ponto2D.elements);
console.log("Transformado:", ponto2DMovido.elements); // [4, 3]

const ponto3D = new Vector(3, [2, -1, 4]);
const ponto3DMovido = transformacoes.translate3D(ponto3D, 3, 2, -5);
console.log("\nAV2 - Translação 3D:");
console.log("Original:", ponto3D.elements);
console.log("Transformado:", ponto3DMovido.elements); // [5, 1, -1]
