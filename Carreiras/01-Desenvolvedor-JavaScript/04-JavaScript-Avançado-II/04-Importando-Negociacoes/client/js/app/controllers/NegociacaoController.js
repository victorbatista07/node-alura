class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            ['adiciona', 'esvazia']
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            ['texto']
        );
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionado com sucesso!';

        this._limpaFormulario();
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        service.obterNegociacaoDaSemana((err, negociacoes) => {
            if(err) {
                this._mensagem.texto = err;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
        });
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
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

/*
importaNegociacoes() {
        let xhr = new XMLHttpRequest(); // ajax

        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => { //esta arrow function será executada a cada status do AJAX
            
             Status do AJAX

             0: requisição ainda não iniciada

             1: conexão com o servidor estabelecida

             2: requisição recebida

             3: processando requisição

             4: requisição concluída e a resposta está pronta
            
            verificando se o status da requisição é 4
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log('Obtendo as negociações do servidor!');
                    //retorna o que veio pelo servidor (dados ou mensagem de erro)
                    // console.log(JSON.parse(xhr.responseText)); //converter um JSON para objeto
                    //o map serve para pecorrer cada item do array e vou modicando-os
                    JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                     debugger;
                } else {
                    console.log('Não foi possível obter as negociações do servidor!');
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível obter as negociações do servidor!';
                }
            }

        };

        xhr.send();
    }
*/