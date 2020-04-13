let titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

var paciente = document.querySelectorAll(".paciente");

paciente.forEach(element => {
    let peso = element.querySelector(".info-peso").textContent;
    let altura = element.querySelector(".info-altura").textContent;
    let tdImc = element.querySelector(".info-imc");

    if(peso <= 0 || peso >= 1000) {
        tdImc.textContent = "Peso inválido!";
        element.classList.add("paciente-invalido");
    } else if (altura <= 0 || altura > 3.00) {
        tdImc.textContent = "Altura inválida!";
        element.classList.add("paciente-invalido");
    } else {
        let imc = calculaImc(peso, altura);
        tdImc.textContent = imc;
    }
});

function calculaImc(peso, altura) {
    let imc = 0;

    imc = peso / (altura * altura)

    return imc.toFixed(2);
}

// titulo.addEventListener("click", mostraMensagem); //adicionando novo escutador de eventos (clicks, passando mouse...). Vou escutar o evento de click e executar a função mostraMensagem
titulo.addEventListener("click", () => {
    console.log("Olá eu fui clicado!");
}); //adicionando novo escutador de eventos (clicks, passando mouse...). Vou escutar o evento de click e executar uma função anonima

function mostraMensagem() {
    console.log("Olá eu fui clicado!");
}

/*
O problema está nessa linha:

botao.addEventListener('click', botaoHandler());
Em vez de associar a função botaoHandler para o evento click, ela acabou associando o retorno da função,
ao adiciona-la usando parênteses. Como a função não retorna nada, o código que será executado será igual a
nada quando o botão for clicado. Para corrigirmos o código, basta retirarmos os parênteses:

botao.addEventListener('click', botaoHandler);
Veja que não estamos mais chamando a função, mas passando-a por inteiro para o evento click . Quando o botão
for clicado, por debaixo dos panos, o navegador executará botaoHandler() para nós.

Ele sabe que todo elemento de entrada, isto é, que recebe entrada do usuário possui a propriedade value
enquanto elementos que exibem informações apenas possuem a propriedade textContent como é o caso da nossa tag span.



O comportamento padrão de um form, quando clicamos em um button ou em um input submit, que está dentro dele, é enviar os dados e recarregar
a página. Por isso, a página de Jéssica sempre recarrega quando o usuário clica no botão.

Para evitarmos este comportamento, devemos chamar a função do Javascript que previne o comportamento padrão de certos elementos:
event.preventDefault.

Observe que passamos event como parâmetro da função. Com isso, incluímos um parâmetro que está sempre presente nas funções executadas
quando ocorre um evento.

Como nem sempre event é usado, às vezes, é desnecessário passá-lo para a função. Mas neste caso, é ele quem contém a função .preventDefault(),
na qual estamos interessados, logo, precisaremos passá-lo como parâmetro.

Um detalhe interessante é que em certos navegadores, mesmo sem receber o event como parâmetro, a função event.preventDefault() continua
funcionando. Isto é uma peculiaridade de certos navegadores modernos, e pode ser que navegadores mais antigos funcionem de forma diferente.

Se nosso objetivo é escrever um código seguindo as boas práticas do mercado, devemos sempre usar event como parâmetro e as funções que são
chamadas pelos eventos.



Para saber mais: event shortcut
Vejamos o seguinte exemplo de código:

<button id="botao">clique-me</button>
<script>

    var botao = document.querySelector('#botao');

    function botaoHandler() {

        alert('Botão clicado');
    }

    botao.addEventListener('click', botaoHandler);
</script>

Nele associamos uma função ao evento click, aquele disparado toda vez que o elemento for clicado, em nosso caso, um botão.
A vantagem do addEventListener é que podemos executar mais de uma função para o mesmo evento. Vejamos:

<button id="botao">clique-me</button>
<script>

    var botao = document.querySelector('#botao');

    function botaoHandler() {

        alert('Botão clicado');
    }

     function outroHandler() {

        alert('Botão clicado também!');
    }


    botao.addEventListener('click', botaoHandler);
    botao.addEventListener('click', outroHandler);
</script>

Nesse caso, temos uma fila de eventos, na qual o primeiro adicionado na fila será executado e o segundo em seguida.
No entanto, quando desejamos executar apenas uma única função por evento, podemos escrever o código da seguinte forma usando um event
shortcut:

<button id="botao">clique-me</button>
<script>

    var botao = document.querySelector('#botao');

    function botaoHandler() {

        alert('Botão clicado');
    }

     function outroHandler() {

        alert('Botão clicado também!');
    }


    botao.onclick = botaoHandler;
</script>

Para cada evento existente no JavaScript, há a propriedade on + nomeDoEvent. No caso, temos onclick para o evento click, onmouseover para o
evento mouseover e assim por diante. Nesse caso, a função que desejamos executar é atribuída direto na propriedade. No entanto, essa forma tem
uma limitação, como estamos guardando a função em uma propriedade, se adicionarmos outra função, essa sobrescreverá a anterior. Vejamos:

<button id="botao">clique-me</button>
<script>

    var botao = document.querySelector('#botao');

    function botaoHandler() {

        alert('Botão clicado');
    }

     function outroHandler() {

        alert('Botão clicado também!');
    }


    botao.onclick = botaoHandler;
    botao.onclick = outroHandler; // substitui botaoHandler
</script>

Sendo assim, a boa prática é trabalhar com addEventListener() mesmo que você só queira adicionar um único evento. Porque mais tarde,
se outro desenvolvedor quiser adicionar outro evento para o mesmo elemento, não corremos o risco de substituir a função já associada por outra.
*/
