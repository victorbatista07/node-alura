class ArquivoHelper {
    constructor() {
        throw new Error('ArquivoHelper não pode ser instânciada!');
    }

    static cria(informacao) {
        return new Arquivo(...informacao.toUpperCase().split('/'));
    }
}