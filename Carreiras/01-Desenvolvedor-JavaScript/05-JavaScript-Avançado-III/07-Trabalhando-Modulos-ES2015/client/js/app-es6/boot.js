// import { NegociacaoController } from './controllers/NegociacaoController';
import { currentInstance } from './controllers/NegociacaoController';
import {} from './polyfill/fetch'; //destacando que o módulo seja carregado, para poder ser usado mais pra frente. Não irei importar nada

//devo colocar a instância aqui, porque o import está aqui
// let negociacaoController = new NegociacaoController();
//ao fazer isso, ela se torna privada do módulo e com isso não consigo invocar nos atributos html
//para resolver isso, devo adicionar as ações via javascript


let negociacaoController = currentInstance(); //retornando o sigleton

//o . é seletor de classe
document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
// o [] é seletor de atributo
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
