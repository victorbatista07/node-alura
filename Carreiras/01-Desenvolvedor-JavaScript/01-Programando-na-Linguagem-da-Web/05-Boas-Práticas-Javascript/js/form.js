let botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", (event) => {
    event.preventDefault(); //previnindo o comportamento padrão do botão. Assim, o botão não enviar os dados do form e não recarrega a página

    let form = document.querySelector("#form-adiciona");
    let tabela = document.querySelector("#tabela-pacientes");

    //form.X permite capturar, pelo o id, o campo de input e acessar seu valor ou qualquer atributo
    // console.log(form.altura); //<input id="altura" name="altura" type="text" placeholder="digite a altura do seu paciente" class="campo campo-medio">
    // console.log(form.altura.value); //valor adicionado no input

    let paciente = obtemPacienteDoFormulario(form);
    let pacienteTr = montaTr(paciente);

    //adicioando o paciente na tabela
    tabela.appendChild(pacienteTr); // adicionado o conjunto de <tr></tr> dentro da lista de pacientes
    
    form.reset(); //limpando o formulário

    console.log(pacienteTr);
    /*
    <tr>
        <td class="info-nome">Gabriel de Almeida Batista</td>
        <td class="info-peso">100</td><td class="info-altura">2</td>
        <td class="info-gordura">10</td><td class="info-imc">25.00</td>
    </tr>
    */
});

function obtemPacienteDoFormulario(form) {
    //extraindo informacoes do paciente do form
    let nome = form.nome.value; //pegando o valor inserido no input de id nome
    let peso = form.peso.value;
    let altura = form.altura.value;
    let gordura = form.gordura.value;
    let imc = calculaImc(peso, altura)

    let paciente = {
        nome,
        peso,
        altura,
        gordura,
        imc
    }

    return paciente;
}

function montaTr(paciente) {
    let pacienteTr = document.createElement("tr"); //criando uma tag <tr></tr>
    pacienteTr.classList.add("paciente");

    let nomeTd = montaTd(paciente.nome, "info-nome");
    let pesoTd = montaTd(paciente.peso, "info-peso");
    let alturaTd = montaTd(paciente.altura, "info-altura");
    let gorduraTd = montaTd(paciente.gordura, "info-gordura");
    let imcTd = montaTd(paciente.imc, "info-imc");

    pacienteTr.appendChild(nomeTd); // adicionando uma nova tag dentro de outra tag. Tipo um <form><body></body></form>
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    return pacienteTr;
}

function montaTd(dado, classe){
    let td = document.createElement("td"); //criando uma tag <td></td>
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}
