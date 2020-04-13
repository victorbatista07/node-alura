$('#btn-placar').click(mostraPlacar);
$('#botao-sync').click(sincronizaPlacar);

function inserePlacar() {
    let corpoTabela = $('.placar').find('tbody');
    let numerosPalavras = $('#contador-palavras').text();
    let usuario = 'Gabriel';
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
    //pegando todas as tr que são filhas direta de tbody
    let linhas = $('tbody>tr');
    //a funcao each do Jquery é semelhante ao foreach
    linhas.each(function () {
        //se eu quiser manipular o this com os metodos do jQuery, devo envolvelo com o jQuery, porque ele é um elemento HTML
        //e não um objeto do jQuery
        //pegando o primeiro TD do meu elemento do tipo tabela
        let usuario = $(this).find('td:nth-child(1)').text();
        let pontos = $(this).find('td:nth-child(2)').text();
        //Object Short Syntax
        let score = {
            usuario,
            pontos
        };

        placar.push(score);
        //só podemos enviar como dados das funções de AJAX do jQuery um Objeto ou uma String
        let dados = {
            placar
        };

        $.post('http://localhost:3000/placar', dados, () => {
            console.log('Placar sincronizado com sucesso');
        });
    });
}

function atualizaPlacar() {
    $.get('http://localhost:3000/placar', (data) => {
        //se eu quiser usar os metodos do jQuery, devo encpsular os objetod JS dentro do jQuery $()
        $(data).each(function () {
            let linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $('tbody').append(linha);
        });
    });
}
