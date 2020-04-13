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

    /**
     * o método indexOf() compara a referência do objeto não primitivo (igual ao Java ou C#).
     * negociacoes.filter(negociacao => 
                this._listaNegociacoes.negociacoes.indexOf(negociacao) == -1
            )
     * Para contornar este problema, basta conver o objeto para uma string JSON.stringify(objeto)
     * e comparar o resultado
     */
    importaNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
        //     .then(negociacoes =>)
        // this._service
        //     .obterNegociacoes()
        //     .then(negociacoes =>
        //         //o filter serve para filtrar uma conjunto de dados, onde ele retorna o objeto se a condição for verdadeira
        //         negociacoes.filter(negociacao => 
        //             //o some serve para verificar se uma lista possui um objeto
        //             !this._listaNegociacoes.negociacoes.some(
        //                 negociacaoExistente => JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))
        //         )
        //     )
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
 * Você deve estar se perguntando qual a diferença dessa estratégia para o uso de Promise.all, que usamos
 * no módulo anterior. Promise.all resolve as promises em paralelo, ou seja, uma promise não aguarda a outra
 * terminar para ser executada. Promise.all é interessante quando uma promise não depende do resultado da
 * promise anterior. Nos casos onde há dependência, o encadeamento de promises é o caminho mais indicado.
 */
