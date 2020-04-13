class DateHelper {

    constructor() {
        throw new Error('DateHelper não pode ser instânciada!');
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('A data deve ter o fomedo yyyy-mm-dd!');

        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }
}
