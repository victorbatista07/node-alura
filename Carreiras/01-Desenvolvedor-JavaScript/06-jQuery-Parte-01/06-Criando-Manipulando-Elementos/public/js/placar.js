function inserePlacar() {
    //o .find() irá procurar a tag que eu especifiquei
    let corpoTabela = $(".placar").find("tbody");
    let numerosPalavras = $("#contador-palavras").text();
    let usuario = 'Gabriel';
    let linha = novaLinha(usuario, numerosPalavras);

    linha.find('.botao-remover').click(removeLinha);
    //append() = adicionar o elemento no final dentro de um elemento
    //prepend() = adicionar como primeiro elemento dentro de um outro elemento
    corpoTabela.append(linha);
}

function novaLinha(nomeUsuario, numerosPalavras) {
    //o bom de criar elementos HTML é que eu posso usar as funcionalidades do objeto
    let linha = $('<tr>'); //criando um elemento html
    let colunaUsuario = $('<td>').text(nomeUsuario); //criando um novo elemento. O jQuery sabe que é para criar um elemento por causda do <>
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
    $(this).parent().parent().remove();
}

/**
 * <section>
    <div>
        <h1>Olá</h1>
    </div>
    <div class="segunda">
        <h1>Mundo</h1>
    </div>
</section>
O código $("h1").parent(".segunda"); seleciona todos os h1s da página, e busca em cada um deles por um pai com a classe segunda. Neste caso, retornando apenas a div inferior.
 */