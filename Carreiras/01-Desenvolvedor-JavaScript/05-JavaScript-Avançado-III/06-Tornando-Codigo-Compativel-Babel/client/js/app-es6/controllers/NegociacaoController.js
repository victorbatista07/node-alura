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
 * Tudo que estiver em app-es6 está na versão mais recente do ECMScrpit
 * Tudo que estiver em app foi transcrevido pelo Babel para o ECMAS4.
 * Eu preciso mapear as alterações realizadas no Babel, para que os erros reflitam o código da pasta app-es6
 * Com esse mapeamento, são criado dois arquivos, um com o código e o outro (com -map) do mapeamento
 * O navegador irá ignorar os arquivos -map, pois ele sabe que serve apenas para mapear os erros
 */

 /**
  * ATENÇÃO: o carregamento do sourcemap no OSX usando Chrome está com problema. Ainda não há um fix. Verifique a cada atualização do Chrome.

Veja que é possível debugar um código transpilado mais facilmente através do uso de sourcemaps.

Mas como ele funciona por baixo dos panos? O arquivo sourcemap possui a estrutura do arquivo original, aliás, o arquivo original nem precisa existir em produção para que o sourcemap funcione.

Se abrirmos o arquivo aluraframe/client/js/app/controllers/NegociacaoController.js, nosso arquivo transcompilador, no final dele temos o seguinte comentário especial:

//# sourceMappingURL=NegociacaoController.js.map
Veja que esse comentário indica para o browser qual sourcemap deve ser carregado.

Outro ponto que você deve estar se perguntando é quando os arquivos sourcemaps serão baixados e se interferem no tempo de carregamento do site. Bem, sourcemaps são baixados apenas quando você abre a ferramenta de desenvolvimento do seu browse, ou seja, seu console ou dev tools. Claro, os arquivo só serão baixados se existirem. Veja que dessa maneira não há prejuízo do carregamento inicial do site.
  */