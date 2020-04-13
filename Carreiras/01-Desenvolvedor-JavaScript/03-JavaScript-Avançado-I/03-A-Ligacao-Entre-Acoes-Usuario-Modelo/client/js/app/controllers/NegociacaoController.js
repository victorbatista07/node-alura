class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document); // associando a função a variável $. Estilo jQuery. Devo colocar o bind para que a função saiba que quero manter o contexto

        this._inputData = $('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');
    }

    adiciona(event) {
        event.preventDefault();

        // console.log(this._inputData.value); // 2019-05-15
        // console.log(this._inputData.value.split('/')); // ["2019-05-15"]
        // let inputDataSplit = this._inputData.value.split('/'); // Isso gera um array [ANO, MÊS, DIA]
        // let inputDataSplit = this._inputData.value.replace(/-/g, ','); //trocando todos os - pela ",", ficando "DIA,MÊS,ANO"
        // let data = new Date(inputDataSplit);
        //os três pontos são uma spread operator
        let data = new Date(...
            this._inputData
                .value
                .split('-')
                .map((item, indice) => item - indice % 2)
            );

        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);
    }
}

/*
Devo evitar de pecorrer o DOM. Por isso, eu uso no constructor()
*/

/*
numeros = [3,2,11,20,8,7];
novosNumeros = numeros.map((item)=> (item%2 +1 ) * item);
console.log(novosNumeros);
 [6, 2, 22, 20, 8, 14]
*/

/*
Temos as seguintes classes:
class Aluno {

    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
    }
}

class Prova {

    constructor(aluno, nota) {
        this.aluno = aluno;
        this.nota = nota;
    }
}

Agora, vamos criar uma lista de avaliações. Cada item da lista é uma instância de Prova:
var avaliacoes = [
    new Prova(new Aluno(1, 'Luana'), 8),
    new Prova(new Aluno(2, 'Cássio'), 6),
    new Prova(new Aluno(3, 'Barney'), 9),
    new Prova(new Aluno(4, 'Bira'), 5)
];

Dessa lista, precisamos dos alunos que foram aprovados, ou seja, que possuam nota maior ou igual a 7.
Contudo, não queremos uma lista de provas no final, apenas uma lista com os nomes:

let aprovados = avaliacoes
    .filter(prova => prova.nota >= 7)
    .map(prova => prova.aluno.nome);
*/