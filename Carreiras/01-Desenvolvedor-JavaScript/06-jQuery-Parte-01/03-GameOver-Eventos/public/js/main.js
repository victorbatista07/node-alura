let frase = $('.frase').text();
let numerosPalavras = frase.split(" ").length;
let tamanhoFrase = $('#tamanhoFrase');
tamanhoFrase.text(numerosPalavras);

let campoDigitacao = $('.campo-digitacao');
campoDigitacao.on('input', () => {
    let conteudo = campoDigitacao.val();
    let qtdPalavras = conteudo.split(/\S+/).length - 1;
    $('#contador-palavras').text(qtdPalavras);
    $('#contador-caracteres').text(conteudo.length);
});

let tempoRestante = $('#tempo-digitacao').text();
//a função one funciona apenas na primeira vez. A função on escuta/executa várias vezes
campoDigitacao.one('focus', function () {
    //toda função setInterval retorna o seu próprio ID
    let idInterval = setInterval(()=> {
        tempoRestante--;
        $('#tempo-digitacao').text(tempoRestante);
        if(tempoRestante === 0) {
            campoDigitacao.attr('disabled', true);
            clearInterval(idInterval);
        }
    }, 1000);
});
