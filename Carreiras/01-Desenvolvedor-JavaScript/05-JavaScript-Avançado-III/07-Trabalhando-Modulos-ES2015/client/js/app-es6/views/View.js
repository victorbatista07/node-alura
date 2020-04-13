export class View {
    constructor(elemento) {
        this._elemento = elemento;
    }

    template() {
        throw new Error('O método deve ser implementado!');
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}

/**
 * exportando a classe para que ela possa ser extendida pelos seus filhos, sem a necessidade de colocar
 * o diretório <script></script> no index.html.
 * Com o export, eu consigo importar a classe View no arquivo MensagemView.js e qualquer arquivo
 * que precise da classe View
 */
