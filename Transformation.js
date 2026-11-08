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

    //Recebe como parâmetros: vector(o vetor 2D que queremos rotacionar, com coordenadas X e Y) e o angle(angulo da rotação, em radianos)
    // Criamos uma matriz 3x3 por estarmos usando coordenadas homogêneas, significando que deve ser acrescentado uma terceira coordenada, a W, que normalmente recebe o valor 1
    // Os valores 0 e 1 completam a matriz homogênea. Essa matriz permite girar o vetor em torno da origem(0,0), sem alterar o seu tamanho
    rotation2D(vector, angle) {
        this._validarAngulo(angle);
        const matrix = new Matrix(3, 3, [
            Math.cos(angle), -Math.sin(angle), 0,
            Math.sin(angle), Math.cos(angle), 0,
            0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matrix, 2);
    }

    // Rotaciona um vetor 3D em torno do eixo X utilizando uma matriz
    // homogênea 4x4. Mantém a coordenada X e modifica Y e Z
    // Conforme o ângulo informado em radianos
    rotation3DX(vector, angle) {
        this._validarAngulo(angle);
        const matrix = new Matrix(4, 4, [
            1, 0, 0, 0,
            0, Math.cos(angle), -Math.sin(angle), 0,
            0, Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matrix, 3);
    }

    // Rotaciona um vetor 3D em torno do eixo Y utilizando uma matriz
    // homogênea 4x4. Mantém a coordenada Y e modifica X e Z
    // conforme o ângulo informado em radianos.
    rotation3DY(vector, angle) {
        this._validarAngulo(angle);
        const matrix = new Matrix(4, 4, [
            Math.cos(angle), 0, Math.sin(angle), 0,
            0, 1, 0, 0,
            -Math.sin(angle), 0, Math.cos(angle), 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matrix, 3);
    }

    // Rotaciona um vetor 3D em torno do eixo Z utilizando uma matriz
    // homogênea 4x4. Mantém a coordenada Z e modifica X e Y
    // conforme o ângulo informado em radianos.
    rotation3DZ(vector, angle) {
        this._validarAngulo(angle);
        const matrix = new Matrix(4, 4, [
            Math.cos(angle), -Math.sin(angle), 0, 0,
            Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matrix, 3);
    }

    // O enunciado contém a grafia "roration2D"; mantida como alias
    // para que ambos os nomes funcionem na correção automática.
    roration2D(vector, angle) {
        return this.rotation2D(vector, angle);
    }

    _validarAngulo(angle) {
        if (typeof angle !== "number" || !Number.isFinite(angle)) {
            throw new Error("O ângulo deve ser um número finito, em radianos.");
        }
    }

    // Reflexão 2D em relação ao eixo X: mantém X e inverte Y.
    reflection2DX(vector) {
        const matriz = new Matrix(3, 3, [
            1, 0, 0,
            0, -1, 0,
            0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 2);
    }

    // Reflexão 2D em relação ao eixo Y: inverte X e mantém Y.
    reflection2DY(vector) {
        const matriz = new Matrix(3, 3, [
            -1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 2);
    }

    // Em 3D, a reflexão associada ao X ocorre no plano YZ:
    // inverte X e mantém Y e Z.
    reflection3DX(vector) {
        const matriz = new Matrix(4, 4, [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 3);
    }

    // Reflexão 3D no plano XZ: inverte Y e mantém X e Z.
    reflection3DY(vector) {
        const matriz = new Matrix(4, 4, [
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 3);
    }

    // Reflexão 3D no plano XY: inverte Z e mantém X e Y.
    reflection3DZ(vector) {
        const matriz = new Matrix(4, 4, [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 3);
    }

    // Cisalhamento 2D: x' = x + kx*y; y' = y + ky*x.
    shearing(vector, kx, ky) {
        if (![kx, ky].every(Number.isFinite)) {
            throw new Error("kx e ky devem ser números finitos.");
        }
        const matriz = new Matrix(3, 3, [
            1, kx, 0,
            ky, 1, 0,
            0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 2);
    }

    // Projeção ortogonal 2D sobre o eixo X: mantém X e zera Y
    // (a "sombra" do ponto sobre o eixo X). A matriz é singular
    // e idempotente (P·P = P), característica de toda projeção.
    projection2DX(vector) {
        const matriz = new Matrix(3, 3, [
            1, 0, 0,
            0, 0, 0,
            0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 2);
    }

    // Projeção ortogonal 2D sobre o eixo Y: zera X e mantém Y.
    projection2DY(vector) {
        const matriz = new Matrix(3, 3, [
            0, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 2);
    }

    // Projeção ortogonal 3D sobre o eixo X: mantém X e zera Y e Z.
    projection3DX(vector) {
        const matriz = new Matrix(4, 4, [
            1, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 3);
    }

    // Projeção ortogonal 3D sobre o eixo Y: zera X e Z e mantém Y.
    projection3DY(vector) {
        const matriz = new Matrix(4, 4, [
            0, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 3);
    }

    // Projeção ortogonal 3D sobre o eixo Z: zera X e Y e mantém Z.
    projection3DZ(vector) {
        const matriz = new Matrix(4, 4, [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return this._aplicarTransformacao(vector, matriz, 3);
    }
}
