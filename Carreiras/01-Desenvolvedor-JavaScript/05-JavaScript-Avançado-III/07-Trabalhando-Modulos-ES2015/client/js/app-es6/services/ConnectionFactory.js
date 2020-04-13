/**
 * Como no ES6 tudo é módulo, essas variáveis fora da classe não são globais
 * ou seja, são acessiveis apenas neste arquivo (módulo)
 */
const stores = ['negociacoes']; //o const bloqueia a reatribuição, mas não a imutabilidade
const version = 4;
const dbName = 'aluraframe';

let connection = null;
let close = null;

// Podemos importar a class ConnectionFacotry, mas não iremos usar as variáveis de cima
export class ConnectionFactory {
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
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error('Você não pode fechar diretamente a conexão.');
                    };
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
