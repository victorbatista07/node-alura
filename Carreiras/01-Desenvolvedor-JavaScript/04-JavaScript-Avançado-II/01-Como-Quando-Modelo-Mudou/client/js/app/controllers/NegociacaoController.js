class NegociacaoController {

    // escopo do this é dinâmico. Ele varia de acordo com a sua chamada
    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');
        // this._listaNegociacoes = new ListaNegociacoes(this, function(model) {
        //     //o this que é invocado aqui faz referencia a classe ListaNegociacao
        //     this._negociacoesView.update(model);
        // });
        this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));

        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionado com sucesso!';

        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
    }

    // este método apaga as negociações da view
    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        let data = DateHelper.textoParaData(this._inputData.value);

        return new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}

/**
 * A arrow function não é apenas uma maneira sucinta de escrever uma função, ela também tem um característica peculiar: 
 * o escopo de this é léxico, em vez de ser dinâmico como a outra função. Isto significa que o this não mudará de acordo com o contexto.
 * Da maneira como estruturamos o código, o this será NegociacaoController - esta condição será mantida independente do local em que chamemos
 * a arrow function, porque ela está amarrada a um escopo imutável.
 */