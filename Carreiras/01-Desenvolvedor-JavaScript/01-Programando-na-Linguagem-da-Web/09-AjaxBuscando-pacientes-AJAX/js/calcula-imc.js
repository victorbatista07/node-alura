let titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

var paciente = document.querySelectorAll(".paciente");

paciente.forEach(element => {
    let peso = element.querySelector(".info-peso").textContent;
    let altura = element.querySelector(".info-altura").textContent;
    let tdImc = element.querySelector(".info-imc");

    if(!validaPeso(peso)) {
        tdImc.textContent = "Peso inválido!";
        element.classList.add("paciente-invalido");
    } else if (!validaAltura(altura)) {
        tdImc.textContent = "Altura inválida!";
        element.classList.add("paciente-invalido");
    } else {
        let imc = calculaImc(peso, altura);
        tdImc.textContent = imc;
    }
});

function validaPeso(peso) {
    if(peso > 0 && peso < 1000) {
        return true;
    } else {
        return false;
    }
}

function validaAltura(altura) {
    if(altura > 0 && altura < 3) {
        return true;
    } else {
        return false;
    }
}

function calculaImc(peso, altura) {
    let imc = 0;

    imc = peso / (altura * altura)

    return imc.toFixed(2);
}
