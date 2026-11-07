import Matrix from "./Matrix.js";
import Vector from "./Vector.js";
import LinearAlgebra from "./LinearAlgebra.js";

// Nome conforme o enunciado do professor ("Tranformations").
export default class Tranformations {
    constructor() {
        this.algebra = new LinearAlgebra();
    }

    // Recebe Vector cartesiano, calcula com coordenadas homogêneas
    // e retorna um novo Vector cartesiano, sem alterar o original.
    _aplicarTransformacao(vector, matrizTransformacao, dimensao) {
        if (!(vector instanceof Vector) || vector.dim !== dimensao) {
            throw new Error(`É necessário fornecer um Vector de dimensão ${dimensao}.`);
        }
        if (vector.elements.some(valor => typeof valor !== "number" || !Number.isFinite(valor))) {
            throw new Error("As coordenadas do vetor devem ser números finitos.");
        }

        const colunaHomogenea = new Matrix(
            dimensao + 1,
            1,
            [...vector.elements, 1]
        );

        const resultado = this.algebra.dot(matrizTransformacao, colunaHomogenea);

        const coordenadas = [];
        for (let i = 0; i < dimensao; i++) {
            coordenadas.push(resultado.get(i, 0));
        }
        return new Vector(dimensao, coordenadas);
    }

    translate2D(vector, dx, dy) {
        if (![dx, dy].every(Number.isFinite)) {
            throw new Error("dx e dy devem ser números finitos.");
        }
        const matriz = new Matrix(3, 3, [
            1, 0, dx,
            0, 1, dy,
            0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 2);
    }

    translate3D(vector, dx, dy, dz) {
        if (![dx, dy, dz].every(Number.isFinite)) {
            throw new Error("dx, dy e dz devem ser números finitos.");
        }
        const matriz = new Matrix(4, 4, [
            1, 0, 0, dx,
            0, 1, 0, dy,
            0, 0, 1, dz,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 3);
    }
}
