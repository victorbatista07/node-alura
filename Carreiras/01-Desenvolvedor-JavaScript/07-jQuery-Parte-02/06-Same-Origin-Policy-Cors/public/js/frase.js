$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria() {
    $('#spinner').toggle();

    // $.get('http://localhost:3000/frases', trocaFraseAleatoria)
    $.get('http://localhost:3001/frases', trocaFraseAleatoria)
        .fail(() => {
            $('#erro').toggle();
            setTimeout(() => {
                $('#erro').toggle();
            }, 2000);
        })
        .always(() => {
            $('#spinner').toggle();
        });
}

function trocaFraseAleatoria(data) {
    let frase = $('.frase');
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    let novaFrase = data[numeroAleatorio];

    frase.text(novaFrase.texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(novaFrase.tempo);
}

function buscaFrase() {
    $('#spinner').toggle();

    let fraseId = $('#frase-id').val();
    let dados = { id: fraseId };

    $.get('http://localhost:3000/frases', dados, trocaFrase)
        .fail(() => {
            $('#erro').toggle();
            setTimeout(() => {
                $('#erro').toggle();
            }, 2000);
        })
        .always(() => {
            $('#spinner').toggle();
        });
}

function trocaFrase(data) {
    let frase = $('.frase');
    let novaFrase = data;

    frase.text(novaFrase.texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(novaFrase.tempo);
}
