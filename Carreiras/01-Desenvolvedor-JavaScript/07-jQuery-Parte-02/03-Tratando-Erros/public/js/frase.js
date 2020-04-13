$('#botao-frase').click(fraseAleatoria);

function fraseAleatoria() {
    $('#spinner').toggle();

    $.get('http://localhost:3000/frases', trocaFraseAleatoria)
        .fail(() => {
            $('#erro').toggle();
            setTimeout(() => {
                $('#erro').toggle();
            }, 2000);
        })
        .always(() => {
            $('#spinner').toggle();
        }); //caso der errado no get, execute a funcao X
}
// data é o retorno da requisição
function trocaFraseAleatoria(data) {
    let frase = $('.frase');
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    let novaFrase = data[numeroAleatorio];

    frase.text(novaFrase.texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(novaFrase.tempo);
}
