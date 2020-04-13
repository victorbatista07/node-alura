/*delegação de eventos.
Em JavaScript existe o termo "Bolha". Uma "Bolha" significa que quando ocorre um evento em uma tag, o pai daquela tag escuta e o pai
do pai da tag escuta e assim por diante, acabando no body.
*/
var table = document.querySelector("table");

table.addEventListener("dblclick", function(event) {
    var alvoEvento = event.target; //o target permite que eu pegue o filho que foi clicado
    var paiDoAlvo = alvoEvento.parentNode; //o "partentNode" permite que eu pegue o pai do alvo

    paiDoAlvo.classList.add("fadeOut");
    setTimeout(() => {
        paiDoAlvo.remove();
    }, 500);

    //setTimeout(functionQueSeráAtivadaDepoisDoTempoDeEspera, tempoDeEspera)
});

// var pacientes = document.querySelectorAll(".paciente");

// pacientes.forEach(paciente => {
//     paciente.addEventListener("dblclick", function() {
//         this.remove();
//     });

//     /*
//     paciente.addEventListener("dblclick", () => {
//         paciente.remove();
//     });
//     */
// })

/*
Todo evento disparado em JavaScript possui um contexto que é acessível através da função executada quando o evento for disparado.Na função,
acessamos o contexto através do objeto implícito this. Ele é uma referência para o elemento do DOM que esta recebendo o evento, logo, sua
natureza é dinâmica, ou seja, se clicarmos no primeiro elemento da lista o this será o primeiro elemento, se clicarmos no último ele será o
último. É a natureza dinâmica do this que nos permite utilizar a mesma função em diferentes contextos.
*/