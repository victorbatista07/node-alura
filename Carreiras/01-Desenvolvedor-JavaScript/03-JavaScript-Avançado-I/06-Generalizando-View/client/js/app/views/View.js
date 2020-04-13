class View {
    constructor(elemento) {
        this._elemento = elemento;
    }

    template() { //forçando para que as classes filhas sobreescreva este método
        throw new Error('O método deve ser implementado!');
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}