// console.log('Ola mundo'); //módulo 03

let frase = $('.frase').text(); //pegando o conteúdo da tag <p>
let numerosPlavras = frase.split(" ").length;
let tamanhoFrase = $('#tamanhoFrase'); // função text serve para pegar o texto entre a tag <p>TEXTO</p> <span>TEXTO</span>

tamanhoFrase.text(numerosPlavras);
/**
 * Se queremos ter acesso ao contéudo textual de um elemento selecionado pelo jQuery, devemos utilizar a função .text(), que nos retorna exatamente isto.
 * 
 * A função .text() tem esta dupla função, nos retornar o valor textual do elemento caso seja chamada sem parâmetro
 * ou alterar o valor de texto do elemento caso seja chamada com uma string como parâmetro.
 */