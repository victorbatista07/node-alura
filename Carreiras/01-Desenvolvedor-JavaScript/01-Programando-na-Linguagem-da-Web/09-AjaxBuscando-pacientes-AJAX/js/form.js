let botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", (event) => {
    event.preventDefault(); //previnindo o comportamento padrão do botão. Assim, o botão não enviar os dados do form e não recarrega a página
    
    let form = document.querySelector("#form-adiciona");
    let paciente = obtemPacienteDoFormulario(form);
    let erros = validaPaciente(paciente);

    if(erros.length > 0) {
        exibiMensagensErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();
    let ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = ""; //a propriedade permite controlar os childs de um HTML
});

function adicionaPacienteNaTabela(paciente) {
    let pacienteTr = montaTr(paciente);
    let tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function obtemPacienteDoFormulario(form) {
    let nome = form.nome.value;
    let peso = form.peso.value;
    let altura = form.altura.value;
    let gordura = form.gordura.value;
    let imc = calculaImc(peso, altura)

    //object short index. Pegando as variáveis de cima e usando como atributo no objeto
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
    let pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe){
    let td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    let erros = [];

    if(!validaPeso(paciente.peso)) erros.push("Peso inválido!");
    if(!validaAltura(paciente.altura)) erros.push("Altura inválida!");
    if(paciente.nome.length == 0) erros.push("O nome não pode ser em branco!");
    if(paciente.gordura.length == 0) erros.push("A gordura não pode ser em branco!");

    return erros;
}

function exibiMensagensErro(erros) {
    let ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = ""; //a propriedade permite controlar os childs de um HTML

    erros.forEach(erro => {
        let li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

/*
Sim, conseguimos obter o HTML interno de um elemento com a propriedade innerHTML! Por exemplo:

var alura = document.querySelector("#alura").innerHTML

Com a propriedade innerHTML, podemos editar obter o conteúdo HTML (HTML interno) de um elemento.

Para editar o HTML interno, como o innerHTML é uma propriedade, utilizamos um sinal de igual (=). Fazemos:

ObjetoDeUmElementoHTML.innerHTML = "Novo conteúdo"
E para obter o HTML interno, fazemos:

ObjetoDeUmElementoHTML.innerHTML
O seu retorno será todo o conteúdo HTML, tanto tags, atributos, classes, etc, no formato de uma String.

var nome = document.querySelector("#nome").innerHTML;
nome = "Meu nome é Rafael";
Na primeira linha, Rafael está obtendo o conteúdo do HTML interno do elemento <p>. Na segunda linha, ele apenas substitui o conteúdo dessa variável, ou seja, não define o innerHTML do elemento. Para modificar o HTML interno, Rafael deve alterar a propriedade innerHTML na segunda linha, e removê-la da primeira:

var nome = document.querySelector("#nome");
nome.innerHTML = "Meu nome é Rafael";
*/