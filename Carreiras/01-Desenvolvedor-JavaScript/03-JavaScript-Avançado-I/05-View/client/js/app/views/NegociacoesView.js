class NegociacoesView {
    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${model.negociacoes.map(element => `
                    <tr>
                        <td>${DateHelper.dataParaTexto(element.data)}</td>
                        <td>${element.quantidade}</td>
                        <td>${element.getValor()}</td>
                        <td>${element.getVolume()}</td>
                    </tr>
                `).join('')}
            </tbody>

            <tfoot>
                <td colspan="3"></td>
                <td>${model.negociacoes.reduce((total, n) => total + n.getVolume(), 0.0)}</td>
            </tfoot>
        </table>
        `
    }

    update(model) {
        // o innerHTML converter a string para um elemento do DOM
        this._elemento.innerHTML = this._template(model);
    }
}

/*
reduce serve para realizar uma soma no array e retornar o total
A função reduce recebe dois parâmetros: uma função e um valor inicial para a variável total.

<td>${
    (function() {
        //fazendo uma function auto executavel
        let total = 0;
        // somando
        model.negociacoes.forEach(n => total += n.valoume);
        return total;
    })()
}</td>
*/