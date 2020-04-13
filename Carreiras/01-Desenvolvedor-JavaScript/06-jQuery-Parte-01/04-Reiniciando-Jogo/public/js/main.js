let campoDigitacao = $('.campo-digitacao');
let tempoInicial = $('#tempo-digitacao').text();

//quando a página estiver carregada, execute...
// $(document).ready(() => {
//     atualizaTamanhoFrase();
//     inicializaContadores();
//     inicializaCronometro();
//     $('#btn-reiniciar').click(reiniciaJogo);
// });
//essa de baixo \/ é equivalente ao de cima /\
$(() => {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $('#btn-reiniciar').click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    let frase = $('.frase').text();
    let numerosPalavras = frase.split(" ").length;
    let tamanhoFrase = $('#tamanhoFrase');
    tamanhoFrase.text(numerosPalavras);
}

function inicializaContadores () {
    campoDigitacao.on('input', () => {
        let conteudo = campoDigitacao.val();
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);
        $('#contador-caracteres').text(conteudo.length);
    });
}

function inicializaCronometro() {
    let tempoRestante = $('#tempo-digitacao').text();
    campoDigitacao.one('focus', function () {
        $('#btn-reiniciar').attr("disabled",true);

        let idInterval = setInterval(()=> {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if(tempoRestante === 0) {
                campoDigitacao.attr('disabled', true);
                clearInterval(idInterval);
                $("#botao-reiniciar").attr("disabled", false);
            }
        }, 1000);
    });
}

//uma expressão de função
//As expressões de função são convenientes ao passar uma função como um argumento para outra função.
let reiniciaJogo = function () {
    campoDigitacao.attr('disabled', false);
    campoDigitacao.val('');
    $('#tempo-digitacao').text(tempoInicial);
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    inicializaCronometro();
}

// let btnReiniciar = $('#btn-reiniciar');
// //os eventos mais comum, eu posso usar o método com o mesmo nome do evento
// btnReiniciar.click(reiniciaJogo);
