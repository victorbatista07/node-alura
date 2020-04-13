class Negociacao {
    constructor (data, quantidade, valor){
        //declarando os atributos da classe
        this._data = new Date(data.getTime()); // Gerando um novo objeto, a partir do recebido. Isso é para remover a mesma referência e, consequetemente, evitar que o atributo seja alterado por fora, pois a referência é a mesma
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this); // Congelando o objeto na sua construção. Assim, não consigo alterar os seus dados
    }

    // Posso criar os métodos get desse jeito, como abaixo
    getVolume() {
        return this._quantidade * this._valor;
    }

    getValor() {
        return this._valor;
    }

    // Mas também posso usar esses get...
    get quantidade() {
        return this._quantidade;
    }

    set quantidade(i) { //criando um método set para receber valores no atributo _quantidade
        this._quantidade = i;
    }

    get data() {
        // return this._data;
        return new Date(this._data.getTime()); // retornando um objeto para evitar alterações. Isso se chama, programação defensiva
    }
}

/*
O método Object.freeze() é ralo, fica na superficie, porque eu posso alterar as propriedades de uma propriedade
do tipo obejto. Como por exemplo, a data, pois o freeze() congela o objeto do this e não os objetos da componetização


Em programação defensiva, devo retornar uma copia do atributo (como fiz na data) e devo gerar uma nova referência, no construtor, de um atributo
para evitar que a referência seja a mesma que a de fora (como fiz na data)
*/

/*
Por mais que estejamos usando Object.freeze(this), sabemos que nossa classe não é totalmente imutável. Apesar de não podermos atribuir novamente um novo objeto à referência que já temos, como negociacao._data = new Date(), nós podemos chamar os métodos do objeto data, que operam sobre seu estado interno, que não é congelado. E agora?

Podemos lançar mão da programação defensiva. Quando chamarem a propriedade getter data, retornaremos uma nova instância de Date com a mesma data da nossa negociação. Como é outra instância, qualquer modificação não impactará em nossa classe.

O mesmo cuidado precisamos tomar com o construtor da classe. Como data é um objeto e objetos são passados como referência em JavaScript, qualquer alteração feita fora da classe pode alterá-la. A ideia é aplicarmos a programação defensiva. Sendo assim, nossa classe fica:

class Negociacao {

    constructor(data, quantidade, valor) {

        this._data = new Date(data.getTime()); // criando uma nova instância a partir do tempo de uma data 
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }
}
*/


/* Código em ES2015
class Pessoa {
    constructor(nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }
    obterNomeCompleto() {
        return `${this.nome} ${this.sobrenome}`;
    }
}

Código em ES5
function Pessoa(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
}
Pessoa.prototype.obterNomeCompleto = function() {
    return this.nome + ' ' + this.sobrenome;
};
*/