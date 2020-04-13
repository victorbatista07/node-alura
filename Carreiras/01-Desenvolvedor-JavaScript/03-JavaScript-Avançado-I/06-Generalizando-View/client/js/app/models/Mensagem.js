class Mensagem {
    // parametro com valor padrao (posso fazer isso em construtor e método)
    constructor(texto = ''){
        this._texto = texto;
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        this._texto = texto;
    }
}