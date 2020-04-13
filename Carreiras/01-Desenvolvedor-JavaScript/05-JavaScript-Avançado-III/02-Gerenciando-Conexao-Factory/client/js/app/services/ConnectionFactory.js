var ConnectionFactory = (function () {
    const stores = ['negociacoes']; //o const bloqueia a reatribuição, mas não a imutabilidade
    const version = 4;
    const dbName = 'aluraframe';

    var connection = null;
    var close = null;

    //devo dar o return da Classe ConnectionFactory para poder acessá-la
    return class ConnectionFactory {
        constructor() {
            throw new Error('Não é possível criar instâncias de ConnectionFactory.');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };
                
                openRequest.onsuccess = e => {
                    if(!connection)
                    {
                        connection = e.target.result;
                        //associando o closse com a connection (o this é a connection)
                        close = connection.close.bind(connection);
                        /**
                         * o close de baixo é feito para testar a API reflect
                         */
                        // close = connection.close;
                        connection.close = function () {
                            throw new Error('Você não pode fechar diretamente a conexão.');
                        }; //Monkey Patch é a ação de alterar uma função de uma biblioteca. Neste caso, estou substituindo o método do close() da connection
                    }

                    resolve(connection);
                };
                
                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name)
                };
            })
        }

        static closeConnection() {
            if(connection) {
                close();
                //aqui, logo abaixo, é usado sem o bind.
                // Reflect.apply(close, connection, []);
                connection = null;
            }
        }

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
    }
})();

/**
 * Quando eu crio uma função anonima (exemplo de cima) e coloco ela dentro de um paretenses
 * e apos o encapsulamento do paretenteses, fecho e abro outro par de paresentes (function(){})();
 * estou criando uma funcao alto invocada. Ela será carregada e ao mesmo tempo executada.
 * Estou armazenando o resultado da funcao alto invocada em uma variável global
 */

 /**
  * let pessoa2 = new Pessoa('Almeida', 'Flávio');

pessoa2.obterNomeCompleto = function() {

  return `${this.nome} - ${this.sobrenome}`;
}
console.log(pessoa2.obterNomeCompleto());
Estamos modificando dinamicamente obterNomeCompleto apenas na instância pessoa2. Veja que usamos function e não arrow function. Foi necessário usar function devido ao seu escopo dinâmico, isto é, this deve variar de acordo com a instância no qual obterNomeCompleto é chamado. Se usarmos arrow function, seu escopo léxico fará com que o this seja sempre do contexto no qual a função é declarada, no caso window, o escopo global.

Inclusive é possível alterar a definição do método diretamente na própria classe, dessa maneira, todas as instâncias de Pessoa, criadas antes ou depois da modificação, automaticamente "herdarão" a modificação:

Pessoa.prototype.obterNomeCompleto = function() {

  return `${this.nome} - ${this.sobrenome}`;
}
O monkey patch deve ser usado com parcimônia, até mesmo como último recurso, quando propõe uma modificação direta na definição da classe. Isto porque modificações usadas globalmente podem ocasionar bugs em diversas partes do nosso código, tendo assim, um resultado imprevisível.
  */
