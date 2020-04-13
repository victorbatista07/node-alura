class Negociacao {
    constructor (data, quantidade, valor){
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this);
    }

    getVolume() {
        return this._quantidade * this._valor;
    }

    getValor() {
        return this._valor;
    }

    get quantidade() {
        return this._quantidade;
    }

    set quantidade(qtd) {
        this._quantidade = qtd;
    }

    get data() {
        return new Date(this._data.getTime());
    }
}
