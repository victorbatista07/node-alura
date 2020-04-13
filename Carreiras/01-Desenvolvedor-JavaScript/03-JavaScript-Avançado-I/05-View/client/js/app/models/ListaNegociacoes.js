class ListaNegociacoes {
    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._negociacoes); //cocatenando um array vázio com o meu array de negociacoes. COm isso, eu retorno um copia da minha lista
    }
}
