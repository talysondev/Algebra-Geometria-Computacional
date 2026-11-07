export default class Matrix  {

    constructor(rows, cols, elements) {
        if(rows <= 0 || isNaN(rows) || !Number.isInteger(rows)) {
            throw new Error("A quantidade de linhas deve ser maior que zero.");
        }

        if(cols <= 0 || isNaN(cols) || !Number.isInteger(cols)) {
            throw new Error("A quantidade de colunas deve ser maior que zero.");
        }

        if(!Array.isArray(elements)) {
            throw new Error("Os elementos devem ser passados em um Array.");
        }

        if(elements.length !== rows * cols) {
            throw new Error("A quantidade de elementos nao corresponde ao tamanho da matriz.");
        }

        this.rows = rows;
        this.cols = cols;
        this.elements = elements;
    }

    get(i, j) {
        if(
            !Number.isInteger(i) ||
            !Number.isInteger(j) ||
            i < 0 ||
            i >= this.rows ||
            j < 0 ||
            j >= this.cols
        ) {
            return null;
        }

        let index = i * this.cols + j;
        return this.elements[index];
    }

    set(i, j, value) {
        if(
            !Number.isInteger(i) ||
            !Number.isInteger(j) ||
            i < 0 ||
            i >= this.rows ||
            j < 0 ||
            j >= this.cols
        ) {
            console.error("Erro: Posição fora dos limites da matriz");
            return null;
        }

        let index = i * this.cols + j;
        this.elements[index] = value;

        return true;
    }
}