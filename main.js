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


// =====================================================
// AV2 - TESTES DE ROTAÇÃO EM COORDENADAS HOMOGÊNEAS
// Ângulos em radianos.  Math.PI / 2 = 90 graus.
// =====================================================
const angulo90 = Math.PI / 2;

function testarTransformacao(nome, obtido, esperado) {
    const tolerancia = 1e-10;
    if (obtido.dim !== esperado.length ||
        !obtido.elements.every((valor, i) => Math.abs(valor - esperado[i]) < tolerancia)) {
        throw new Error(`${nome}: resultado inesperado: ${JSON.stringify(obtido.elements)}`);
    }
    console.log(`${nome}: OK`, obtido.elements);
}

console.log("\nAV2 - Testes das quatro rotações:");
testarTransformacao(
    "Rotação 2D (90 graus)",
    transformacoes.rotation2D(new Vector(2, [1, 0]), angulo90),
    [0, 1]
);
testarTransformacao(
    "Rotação 3D eixo X (90 graus)",
    transformacoes.rotation3DX(new Vector(3, [0, 1, 0]), angulo90),
    [0, 0, 1]
);
testarTransformacao(
    "Rotação 3D eixo Y (90 graus)",
    transformacoes.rotation3DY(new Vector(3, [0, 0, 1]), angulo90),
    [1, 0, 0]
);
testarTransformacao(
    "Rotação 3D eixo Z (90 graus)",
    transformacoes.rotation3DZ(new Vector(3, [1, 0, 0]), angulo90),
    [0, 1, 0]
);


// =====================================================
// AV2 - TESTES DE REFLEXÕES E CISALHAMENTO
// Reflexões 3D nos planos YZ, XZ e XY, respectivamente.
// =====================================================
console.log("\nAV2 - Testes de reflexão e cisalhamento:");
testarTransformacao(
    "Reflexão 2D eixo X",
    transformacoes.reflection2DX(new Vector(2, [2, 3])),
    [2, -3]
);
testarTransformacao(
    "Reflexão 2D eixo Y",
    transformacoes.reflection2DY(new Vector(2, [2, 3])),
    [-2, 3]
);
testarTransformacao(
    "Reflexão 3D plano YZ (X)",
    transformacoes.reflection3DX(new Vector(3, [2, 3, 4])),
    [-2, 3, 4]
);
testarTransformacao(
    "Reflexão 3D plano XZ (Y)",
    transformacoes.reflection3DY(new Vector(3, [2, 3, 4])),
    [2, -3, 4]
);
testarTransformacao(
    "Reflexão 3D plano XY (Z)",
    transformacoes.reflection3DZ(new Vector(3, [2, 3, 4])),
    [2, 3, -4]
);
testarTransformacao(
    "Cisalhamento 2D (kx=2, ky=3)",
    transformacoes.shearing(new Vector(2, [1, 2]), 2, 3),
    [5, 5]
);


// =====================================================
// AV2 - TESTES DE PROJEÇÕES ORTOGONAIS
// Em 3D, a projeção é sobre o eixo indicado (não sobre um plano).
// =====================================================
console.log("\nAV2 - Testes de projeções ortogonais:");
testarTransformacao(
    "Projeção 2D no eixo X",
    transformacoes.projection2DX(new Vector(2, [2, 3])),
    [2, 0]
);
testarTransformacao(
    "Projeção 2D no eixo Y",
    transformacoes.projection2DY(new Vector(2, [2, 3])),
    [0, 3]
);
testarTransformacao(
    "Projeção 3D no eixo X",
    transformacoes.projection3DX(new Vector(3, [2, 3, 4])),
    [2, 0, 0]
);
testarTransformacao(
    "Projeção 3D no eixo Y",
    transformacoes.projection3DY(new Vector(3, [2, 3, 4])),
    [0, 3, 0]
);
testarTransformacao(
    "Projeção 3D no eixo Z",
    transformacoes.projection3DZ(new Vector(3, [2, 3, 4])),
    [0, 0, 4]
);
