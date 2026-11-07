export default class Vector{
    constructor(dim, elements){
        if(dim <= 0){
            throw new Error("A dimensão deve ser maior que zero.");
        }

        if (!Array.isArray(elements)){
             throw new Error("Os elemetos devem estar em um Array.");
        }

        if(elements.length != dim){
            throw new Error("A quantidade de elementos deve ser igual à dimensão.");
        }

        
        this.dim = dim;
        this.elements = elements;


    }
    get(i){
         if (i < 0 || i >= this.dim) {
            throw new Error("Índice fora dos limites do vetor.");
        }

        return this.elements[i];


    }
    set(i,value){
         if (i < 0 || i >= this.dim) {
            throw new Error("Índice fora dos limites do vetor.");
        }

        this.elements[i] = value;


    }
}
