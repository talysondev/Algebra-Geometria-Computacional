import Matrix from "./Matrix.js";
import Vector from "./Vector.js";

class LinearAlgebra {

    // =====================================================
    // MÉTODOS AUXILIARES
    // =====================================================

    // Valida se o parâmetro é uma Matrix
    // e se todos os elementos são números válidos
    _validarMatrix(a, nomeMetodo) {

        if (!(a instanceof Matrix)) {
            throw new Error(
                nomeMetodo +
                ": o parâmetro deve ser um objeto da classe Matrix."
            );
        }

        for (let k = 0; k < a.elements.length; k++) {

            if (
                typeof a.elements[k] !== "number" ||
                !isFinite(a.elements[k])
            ) {
                throw new Error(
                    nomeMetodo +
                    ": todos os elementos da matriz devem ser números válidos."
                );
            }
        }
    }


    // Cria uma cópia da Matrix
    // para não modificar a original
    _copiar(a) {

        return new Matrix(
            a.rows,
            a.cols,
            [...a.elements]
        );
    }


    // Calcula uma tolerância para erros de ponto flutuante
    _tolerancia(a) {

        let maiorAbs = 0;

        for (let k = 0; k < a.elements.length; k++) {

            const v = Math.abs(a.elements[k]);

            if (v > maiorAbs) {
                maiorAbs = v;
            }
        }

        return (
            Math.max(a.rows, a.cols) *
            Number.EPSILON *
            maiorAbs
        );
    }


    // Troca duas linhas de uma Matrix
    _trocarLinhas(m, i, k) {

        if (i === k) {
            return;
        }

        for (let j = 0; j < m.cols; j++) {

            const temp = m.get(i, j);

            m.set(
                i,
                j,
                m.get(k, j)
            );

            m.set(
                k,
                j,
                temp
            );
        }
    }


    // =====================================================
    // TRANSPOSE
    // =====================================================

    transpose(a) {

        // Matrix
        if (a instanceof Matrix) {

            let elements = [];

            for (let j = 0; j < a.cols; j++) {

                for (let i = 0; i < a.rows; i++) {

                    elements.push(
                        a.get(i, j)
                    );
                }
            }

            return new Matrix(
                a.cols,
                a.rows,
                elements
            );
        }


        // Vector
        if (a instanceof Vector) {

            return new Vector(
                a.dim,
                [...a.elements]
            );
        }


        throw new Error(
            "O método transpose deve receber uma Matrix ou um Vector."
        );
    }


    // =====================================================
    // SUM
    // =====================================================

    sum(a, b) {

        // Matrix + Matrix
        if (
            a instanceof Matrix &&
            b instanceof Matrix
        ) {

            if (
                a.rows !== b.rows ||
                a.cols !== b.cols
            ) {
                throw new Error(
                    "As matrizes devem possuir as mesmas dimensões."
                );
            }

            let elements = [];

            for (let i = 0; i < a.rows; i++) {

                for (let j = 0; j < a.cols; j++) {

                    elements.push(
                        a.get(i, j) +
                        b.get(i, j)
                    );
                }
            }

            return new Matrix(
                a.rows,
                a.cols,
                elements
            );
        }


        // Vector + Vector
        if (
            a instanceof Vector &&
            b instanceof Vector
        ) {

            if (a.dim !== b.dim) {

                throw new Error(
                    "Os vetores devem possuir a mesma dimensão."
                );
            }

            let elements = [];

            for (let i = 0; i < a.dim; i++) {

                elements.push(
                    a.get(i) +
                    b.get(i)
                );
            }

            return new Vector(
                a.dim,
                elements
            );
        }


        throw new Error(
            "A soma deve ser feita entre duas Matrix ou dois Vector."
        );
    }


    // =====================================================
    // TIMES
    // Multiplicação elemento a elemento
    // =====================================================

    times(a, b) {

        // Matrix × Matrix
        if (
            a instanceof Matrix &&
            b instanceof Matrix
        ) {

            if (
                a.rows !== b.rows ||
                a.cols !== b.cols
            ) {

                throw new Error(
                    "As matrizes devem ter as mesmas dimensões."
                );
            }

            let elements = [];

            for (let i = 0; i < a.rows; i++) {

                for (let j = 0; j < a.cols; j++) {

                    elements.push(
                        a.get(i, j) *
                        b.get(i, j)
                    );
                }
            }

            return new Matrix(
                a.rows,
                a.cols,
                elements
            );
        }


        // Vector × Vector
        if (
            a instanceof Vector &&
            b instanceof Vector
        ) {

            if (a.dim !== b.dim) {

                throw new Error(
                    "Os vetores devem ter a mesma dimensão."
                );
            }

            let elements = [];

            for (let i = 0; i < a.dim; i++) {

                elements.push(
                    a.get(i) *
                    b.get(i)
                );
            }

            return new Vector(
                a.dim,
                elements
            );
        }


        // Escalar × Matrix
        if (
            typeof a === "number" &&
            b instanceof Matrix
        ) {

            let elements = [];

            for (let i = 0; i < b.rows; i++) {

                for (let j = 0; j < b.cols; j++) {

                    elements.push(
                        a * b.get(i, j)
                    );
                }
            }

            return new Matrix(
                b.rows,
                b.cols,
                elements
            );
        }


        throw new Error(
            "Operação inválida para o método times."
        );
    }


    // =====================================================
    // DOT
    // Multiplicação tradicional de matrizes
    // =====================================================

    dot(a, b) {

        if (
            a instanceof Matrix &&
            b instanceof Matrix
        ) {

            if (a.cols !== b.rows) {

                throw new Error(
                    "O número de colunas da matriz A deve ser igual ao número de linhas da matriz B."
                );
            }

            let elements = [];

            for (let i = 0; i < a.rows; i++) {

                for (let j = 0; j < b.cols; j++) {

                    let soma = 0;

                    for (let k = 0; k < a.cols; k++) {

                        soma +=
                            a.get(i, k) *
                            b.get(k, j);
                    }

                    elements.push(soma);
                }
            }

            return new Matrix(
                a.rows,
                b.cols,
                elements
            );
        }


        throw new Error(
            "O método dot deve receber duas matrizes."
        );
    }


    // =====================================================
    // GAUSS
    // =====================================================

    gauss(a) {

        this._validarMatrix(
            a,
            "gauss"
        );

        const m = this._copiar(a);

        const tol =
            this._tolerancia(m);

        let linhaPivo = 0;


        for (
            let col = 0;
            col < m.cols &&
            linhaPivo < m.rows;
            col++
        ) {

            let melhorLinha =
                linhaPivo;


            // Procura o melhor pivô
            for (
                let i = linhaPivo + 1;
                i < m.rows;
                i++
            ) {

                if (
                    Math.abs(
                        m.get(i, col)
                    )
                    >
                    Math.abs(
                        m.get(
                            melhorLinha,
                            col
                        )
                    )
                ) {

                    melhorLinha = i;
                }
            }


            // Coluna praticamente nula
            if (
                Math.abs(
                    m.get(
                        melhorLinha,
                        col
                    )
                ) <= tol
            ) {

                for (
                    let i = linhaPivo;
                    i < m.rows;
                    i++
                ) {

                    m.set(
                        i,
                        col,
                        0
                    );
                }

                continue;
            }


            // Troca linhas
            this._trocarLinhas(
                m,
                linhaPivo,
                melhorLinha
            );


            // Zera os elementos abaixo do pivô
            for (
                let i = linhaPivo + 1;
                i < m.rows;
                i++
            ) {

                const fator =
                    m.get(i, col) /
                    m.get(
                        linhaPivo,
                        col
                    );


                for (
                    let j = col;
                    j < m.cols;
                    j++
                ) {

                    m.set(
                        i,
                        j,
                        m.get(i, j) -
                        fator *
                        m.get(
                            linhaPivo,
                            j
                        )
                    );
                }


                m.set(
                    i,
                    col,
                    0
                );
            }


            linhaPivo++;
        }


        return m;
    }


    // =====================================================
    // SOLVE
    // Gauss-Jordan
    // =====================================================

    solve(a) {

        this._validarMatrix(
            a,
            "solve"
        );


        if (a.cols < 2) {

            throw new Error(
                "solve: a matriz aumentada deve ter pelo menos 2 colunas ([A | b])."
            );
        }


        // Número de incógnitas
        const n =
            a.cols - 1;


        const tol =
            this._tolerancia(a);


        // FASE 1
        // Escalonamento por Gauss
        const m =
            this.gauss(a);


        // FASE 2
        // Gauss-Jordan
        for (
            let i = m.rows - 1;
            i >= 0;
            i--
        ) {

            let colPivo = -1;


            // Procura o pivô da linha
            for (
                let j = 0;
                j < m.cols;
                j++
            ) {

                if (
                    Math.abs(
                        m.get(i, j)
                    ) > tol
                ) {

                    colPivo = j;
                    break;
                }
            }


            if (
                colPivo === -1 ||
                colPivo === n
            ) {

                continue;
            }


            // Faz o pivô virar 1
            const pivo =
                m.get(
                    i,
                    colPivo
                );


            for (
                let j = colPivo;
                j < m.cols;
                j++
            ) {

                m.set(
                    i,
                    j,
                    m.get(i, j) /
                    pivo
                );
            }


            // Zera elementos acima do pivô
            for (
                let k = i - 1;
                k >= 0;
                k--
            ) {

                const fator =
                    m.get(
                        k,
                        colPivo
                    );


                for (
                    let j = colPivo;
                    j < m.cols;
                    j++
                ) {

                    m.set(
                        k,
                        j,
                        m.get(k, j) -
                        fator *
                        m.get(
                            i,
                            j
                        )
                    );
                }
            }
        }


        // =================================================
        // FASE 3
        // Classificação do sistema
        // =================================================

        let posto = 0;


        for (
            let i = 0;
            i < m.rows;
            i++
        ) {

            let temCoeficiente =
                false;


            for (
                let j = 0;
                j < n;
                j++
            ) {

                if (
                    Math.abs(
                        m.get(i, j)
                    ) > tol
                ) {

                    temCoeficiente =
                        true;

                    break;
                }
            }


            if (temCoeficiente) {

                posto++;

            } else if (
                Math.abs(
                    m.get(i, n)
                ) > tol
            ) {

                throw new Error(
                    "solve: o sistema é impossível (não possui solução)."
                );
            }
        }


        if (posto < n) {

            throw new Error(
                "solve: o sistema é indeterminado (possui infinitas soluções)."
            );
        }


        // =================================================
        // EXTRAÇÃO DA SOLUÇÃO
        // =================================================

        const solucao = [];


        for (
            let i = 0;
            i < n;
            i++
        ) {

            const valor =
                m.get(i, n);


            solucao.push(
                valor === 0
                    ? 0
                    : valor
            );
        }


        return new Matrix(
            n,
            1,
            solucao
        );
    }
}

export default LinearAlgebra;