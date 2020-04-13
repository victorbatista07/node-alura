class ListaNegociacoes {
    constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
        // this._contexto = contexto;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this);
        // Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    // este método esvazia as negociações do modelos para que elas sejam apagadas da view
    esvazia() {
        this._negociacoes = [];
        this._armadilha(this);
        //o apply serve para manter o this estático. Para isso devo passar a função que quero executar, o contexto que quero manter e o objeto que quero referencia na mudança (ou seja, o parametro da função que quero executar)
        // Reflect.apply(this._armadilha, this._contexto, [this]);
    }
}

/**Devo usar o Reflect, porque o this é dinâmico, ou seja, o this que é invocado na classe NegociacaoCOntroller
 * faz referencia a esta classe, pois o this vai mudando conforme a sua chamada
 * 
 * de fato o this de uma arrow function é o do contexto léxico de onde ela foi executada,
 */