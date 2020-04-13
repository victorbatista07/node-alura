let botaoBuscar = document.querySelector("#buscar-pacientes");

botaoBuscar.addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    let erroAjax = document.querySelector("#erro-ajax");

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); //abrindo conexão com o servidor
    
    xhr.addEventListener("load", () => {

        if(xhr.status != 200) {
            console.log(xhr.status);
            console.log(xhr.response);
            erroAjax.classList.remove("invisivel");
            return;
        }

        let response = xhr.responseText;
        let pacientes = JSON.parse(response);

        pacientes.forEach(paciente => {
            adicionaPacienteNaTabela(paciente);
        });

        erroAjax.classList.add("invisivel");

    }); //configurando um evento de escuta para que seja executado uma função após o response

    xhr.send(); //enviando a requisição (GET)
});
