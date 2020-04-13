$('#btn-placar').click(mostraPlacar);

function inserePlacar() {
    let corpoTabela = $(".placar").find("tbody");
    let numerosPalavras = $("#contador-palavras").text();
    let usuario = 'Gabriel';
    let linha = novaLinha(usuario, numerosPalavras);

    linha.find('.botao-remover').click(removeLinha);
    corpoTabela.append(linha);

    $('.placar').slideDown(500); //mostrando o placar
    scrollPlacar();
}

function scrollPlacar() {
    const possicaoPlacar = $('.placar').offset().top;
    $('body').animate({
        //animando o scroll. ELe irá descer para o meu placar
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
    // $(this).parent().parent().remove(); //apagando o elemento
    $(this).parent().parent().fadeOut(1000); //ocultando o placar com suavidade
    setTimeout(() => $(this).parent().parent().remove(), 1000);
}

function mostraPlacar() {
    // $('.placar').css('display', 'block');
    // $('.placar').show(); //mostra o elemento
    // $('.placar').hide(); //oculta o elemento
    // $('.placar').toggle(); //mostra ou esconde o elemento
    //a função .stop() para a animação atual e inicia a próximo, no meu caso é a slideToggle()
    $('.placar').stop().slideToggle(600); //mostrando o placar como um slide
}
