import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';
import { Negociacao } from '../models/Negociacao';

class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._service = new NegociacaoService();

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');

        this._init();
    }

    _init() {
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(error => this._mensagem.texto = error);

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event) {
        event.preventDefault();
        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(error => this._mensagem.texto = error);
    }

    importaNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
              negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
              this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(error => this._mensagem.texto = error);
    }

    apaga() {
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(error => this._mensagem = error);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;
    }
}

/**
 * No ECMAScript 6 todos os códigos escritos em arquivos .js são módulos e não estão acessível no escopo global
 */

/**
 * Agora, fizemos todas as importações necessárias. Mas por que o código não funciona como está? Porque a especificação ES2015 define o
 * import e export, além de que cada script é um módulo independente. No entanto, não definimos como estes módulos devem ser carregados no
 * navegador. Não existe um consenso... Precisamos que os scripts sejam carregados em uma determinada ordem no seu sistema, definindo apenas o
 * primeiro. A partir deste, serão carregados os demais. O responsável pelo processo é loader, porém, não existe um padrão nos navegadores.
 * Para resolver a questão, teremos que escolher uma biblioteca de terceiro que atue como um loader de script. Uma biblioteca muito famosa é
 * System JS. Nós iremos baixá-lo pelo NPM do Node.JS, e iremos colocá-lo na pasta node_modules.
 * 
 * Em outras palavras, o ES2015 especifica os import e export, mas não implementa os mesmos.
 * 
*/

//quando o módulo é carregado (este arquivo), ele cria uma intância (única) de NegociaçãoController e a função de baixo retorna a mesma 
let negociacaoController = new NegociacaoController();
//esta função retorna a instância corrente do controller
export function currentInstance() {
    return negociacaoController; //Design Patterns Sigleton
}
