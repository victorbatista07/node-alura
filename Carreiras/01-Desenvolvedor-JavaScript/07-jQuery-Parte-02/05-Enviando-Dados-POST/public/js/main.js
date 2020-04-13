let campoDigitacao = $('.campo-digitacao');
let tempoInicial = $('#tempo-digitacao').text();

$(() => {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    atualizaPlacar();

    $('#btn-reiniciar').click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    let frase = $('.frase').text();
    let numerosPalavras = frase.split(" ").length;
    let tamanhoFrase = $('#tamanhoFrase');

    tamanhoFrase.text(numerosPalavras);
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
}

function inicializaContadores () {
    campoDigitacao.on('input', () => {
        let conteudo = campoDigitacao.val();
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);
        $('#contador-caracteres').text(conteudo.length);
    });
}

function inicializaMarcadores() {
    campoDigitacao.on('input', () => {
        let frase = $('.frase').text();
        let digitado = campoDigitacao.val();
        let comparavel = frase.substr(0, digitado.length);
    
        if(digitado === comparavel) {
            campoDigitacao.addClass('borda-verde');
            campoDigitacao.removeClass('borda-vermelha');
        } else {
            campoDigitacao.addClass('borda-vermelha');
            campoDigitacao.removeClass('borda-verde');
        }
    });
}

function inicializaCronometro() {
    campoDigitacao.one('focus', function () {
        $('#btn-reiniciar').attr('disabled',true);
        let tempoRestante = $('#tempo-digitacao').text();
        let idInterval = setInterval(()=> {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if(tempoRestante === 0) {
                finalizaJogo();
                clearInterval(idInterval);
            }
        }, 1000);
    });
}

function finalizaJogo(){
    campoDigitacao.attr('disabled', true);
    $('#btn-reiniciar').attr('disabled', false);
    campoDigitacao.toggleClass('campo-desativado');
    inserePlacar();
}

let reiniciaJogo = function () {
    campoDigitacao.attr('disabled', false);
    campoDigitacao.val('');
    $('#tempo-digitacao').text(tempoInicial);
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    inicializaCronometro();
    campoDigitacao.removeClass('campo-desativado')
    campoDigitacao.removeClass('borda-verde');
    campoDigitacao.removeClass('borda-vermelha');
}
