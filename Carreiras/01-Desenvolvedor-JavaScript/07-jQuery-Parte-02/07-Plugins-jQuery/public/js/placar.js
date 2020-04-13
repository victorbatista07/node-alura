$('#btn-placar').click(mostraPlacar);
$('#botao-sync').click(sincronizaPlacar);

function inserePlacar() {
    let corpoTabela = $('.placar').find('tbody');
    let numerosPalavras = $('#contador-palavras').text();
    let usuario = $('#usuarios').val();
    let linha = novaLinha(usuario, numerosPalavras);

    linha.find('.botao-remover').click(removeLinha);
    corpoTabela.append(linha);

    $('.placar').slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    const possicaoPlacar = $('.placar').offset().top;
    $('body').animate({
        scrollTop: possicaoPlacar + 'px'
    }, 1000);
}

function novaLinha(nomeUsuario, numerosPalavras) {
    let linha = $('<tr>');
    let colunaUsuario = $('<td>').text(nomeUsuario);
    let colunaPalavras = $('<td>').text(numerosPalavras);
    let colunaRemover = $('<td>');

    let link = $('<a>').addClass('botao-remover').attr('href', '#');
    let icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    $(this).parent().parent().fadeOut(1000);
    setTimeout(() => $(this).parent().parent().remove(), 1000);
}

function mostraPlacar() {
    $('.placar').stop().slideToggle(600);
}

function sincronizaPlacar() {
    let placar = [];
    let linhas = $('tbody>tr');

    linhas.each(function () {
        let usuario = $(this).find('td:nth-child(1)').text();
        let pontos = $(this).find('td:nth-child(2)').text();
        let score = {
            usuario,
            pontos
        };

        placar.push(score);
        let dados = {
            placar
        };

        $.post('http://localhost:3000/placar', dados, () => {
            console.log('Placar sincronizado com sucesso');
            $('.tooltip').tooltipster('open');
        })
        .fail(() => {
            $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao sincronizar');
        })
        .always(() => {
            setTimeout(function() {
                $('.tooltip').tooltipster('close'); 
            }, 1200);
        });
    });
}

function atualizaPlacar() {
    $.get('http://localhost:3000/placar', (data) => {
        $(data).each(function () {
            let linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $('tbody').append(linha);
        });
    });
}

/**
 * Para eu realizar uma requisição ajax, devo possuir a mesma origem, ou seja,
 * Possuir o mesmo protocolo
 * Possuir a mesma porta
 * Possuir o mesmo host
 * 
 * Os navegadores bloqueiam isso para proteger os usuários contra scripts maliciosos.
 * 
 * Para liberar o AJAX de alguns site, devo configurar no servidor, na opção "Access-Control-Allow-Origin"
 */
