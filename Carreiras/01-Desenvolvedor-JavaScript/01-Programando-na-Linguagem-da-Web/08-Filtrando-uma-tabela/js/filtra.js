let campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", () => {
    let pacientes = document.querySelectorAll(".paciente");

    pacientes.forEach(paciente => {
        let tdNome = paciente.querySelector(".info-nome");
        let nome = tdNome.textContent;
        let expresao = new RegExp(campoFiltro.value, "i");

        if(!expresao.test(nome)) {
            paciente.classList.add("invisivel");
        } else {
            paciente.classList.remove("invisivel");
        }

        /*
        var comparavel = nome.substr(0, this.value.length);
        var comparavelMinusculo = comparavel.toLowerCase();
        var valorDigitadoMinusculo = this.value.toLowerCase();

        if (!(valorDigitadoMinusculo == comparavelMinusculo)) {
            paciente.classList.add("invisivel");
        } else{
            paciente.classList.remove("invisivel");
        }

        Esta é uma alternativa de implementar a mesma funcionalidade sem expressão regular, porém temos que escrever mais e nos preocupar com
        mais detalhes! Fica ai esta opção para você guardar nos seus conhecimentos.
        */
    }); 
});

/*
campoFiltro.addEventListener("input", function() {
    let pacientes = document.querySelectorAll(".paciente");

    pacientes.forEach(paciente => {
        let tdNome = paciente.querySelector(".info-nome");
        let nome = tdNome.textContent;
        let expresao = new RegExp(this.value, );

        if(nome != this.value && this.value.length > 0) {
            paciente.classList.add("invisivel");
        } else {
            paciente.classList.remove("invisivel");
        }
    }); 
});
*/