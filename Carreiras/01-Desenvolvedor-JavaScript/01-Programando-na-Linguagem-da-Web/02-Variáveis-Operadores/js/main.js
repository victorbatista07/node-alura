let titulo = document.querySelector(".titulo");
titulo.textContent = "Banana";

var paciente = document.querySelector("#primeiro-paciente");
console.log(paciente);
/*
<tr class="paciente" id="primeiro-paciente">
	<td class="info-nome">Paulo</td>
	<td class="info-peso">100</td>
	<td class="info-altura">2.00</td>
	<td class="info-gordura">10</td>
	<td class="info-imc">0</td>
</tr>
*/

var tdPeso = paciente.querySelector(".info-peso"); //pegando a tag dentro do conjunto de tag de paciente
console.log(tdPeso); //<td class="info-peso">100</td>

var peso = tdPeso.textContent;
console.log(peso); //100

var tdAltura = paciente.querySelector(".info-altura");
console.log(tdAltura); //<td class="info-altura">2.00</td>

var altura = tdAltura.textContent;
console.log(altura); //2.00

var tdImc = paciente.querySelector(".info-imc");

if(peso <= 0 || peso >= 1000){
    console.log("Peso inválido!");
    tdImc.textContent = "Peso inválido!";
} else if (altura <= 0 || altura > 3.00) {
    console.log("Altura inválida!");
    tdImc.textContent = "Altura inválida!";
} else {
    let imc = peso / (altura * altura);
    console.log(imc);

    tdImc.textContent = imc;
}
