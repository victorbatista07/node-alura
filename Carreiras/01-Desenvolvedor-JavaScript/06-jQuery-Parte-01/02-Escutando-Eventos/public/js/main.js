let frase = $('.frase').text();
let numerosPalavras = frase.split(" ").length;
let tamanhoFrase = $('#tamanhoFrase');

tamanhoFrase.text(numerosPalavras);
//. = classe; # = ID
let campoDigitacao = $('.campo-digitacao');
//adicionando um evento ao text area
campoDigitacao.on('input', () => {
    let conteudo = campoDigitacao.val();
    let qtdPalavras = conteudo.split(/\S+/).length - 1;
    $('#contador-palavras').text(qtdPalavras);
    $('#contador-caracteres').text(conteudo.length);
});