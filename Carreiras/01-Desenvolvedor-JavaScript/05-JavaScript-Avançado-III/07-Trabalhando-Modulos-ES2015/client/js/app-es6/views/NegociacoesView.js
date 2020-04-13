import { DateHelper } from '../helpers/DateHelper';
import { View } from './View';
import { currentInstance } from '../controllers/NegociacaoController';

export class NegociacoesView extends View {
    constructor(elemento) {
        super(elemento);

        //delegação de eventos (tipo bolha)
        elemento.addEventListener('click', function(event) {
            //se o cara que disparou o evento for a tag TH
            if(event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase());
        });
    }

    template(model) {
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
                        <td>${element.valor}</td>
                        <td>${element.volume}</td>
                    </tr>
                `).join('')}
            </tbody>

            <tfoot>
                <td colspan="3"></td>
                <td>${model.volumeTotal}</td>
            </tfoot>
        </table>
        `
    }
}
