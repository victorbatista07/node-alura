class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        //resolve é uma função que recebe o retorno de sucesso da Promisse
        //reject é uma função que recebe o erro
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });
        });
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();

        //     xhr.open('GET', 'negociacoes/anterior');

        //     xhr.onreadystatechange = () => {
        //         if(xhr.readyState == 4) {
        //             if(xhr.status == 200) {
        //                 resolve(JSON.parse(xhr.responseText)
        //                  .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        //             } else {
        //                 console.log(xhr.responseText);
        //                 reject('Não foi possível obter as negociações da semana anterior');
        //             }
        //         }
        //     };

        //     xhr.send();
        // });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });
        });
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();

        //     xhr.open('GET', 'negociacoes/retrasada');

        //     xhr.onreadystatechange = () => {
        //         if(xhr.readyState == 4) {
        //             if(xhr.status == 200) {
        //                 resolve(JSON.parse(xhr.responseText)
        //                  .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        //             } else {
        //                 console.log(xhr.responseText);
        //                 reject('Não foi possível obter as negociações da semana retrasada');
        //             }
        //         }
        //     };

        //     xhr.send();
        // });
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }
}

/*
Temos o seguinte código:

let dadosServidor = [
    [
        [new Date(), 1, 100],
        [new Date(), 2, 100]
    ],
    [
        [new Date(), 1, 150],
        [new Date(), 2, 300]
    ],
    [
        [new Date(), 3, 50],
        [new Date(), 1, 100]
    ]
];

Se quisermos criar um array de uma única dimensão para depois criarmos uma lista de
negociações a partir da classe Negociacao fazemos:

let listaDeNegociacoes = dadosServidor
    .reduce((novoArray, array) => novoArray.concat(array), [])
    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

*/
