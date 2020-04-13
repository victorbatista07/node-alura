console.log("Olá mundo");
// let titulo = document.querySelector("h1"); //selecionando a tag h1 (<h1>Aparecida Nutrição</h1>)
let titulo = document.querySelector(".titulo"); //selecionando uma tag pela classe. A classe é indicada pelo ponto
console.log(titulo.textContent); //pegando o conteúdo da tag h1 (Aparecida Nutrição)
titulo.textContent = "Banana"; //mudando o conteúdo da tag h1

/*
O document é uma variável muito importante do Javascript. Ela contém o DOM ou Document Object Model, que é como o navegador enxerga o
HTML utilizado por ele para renderizar a página.

O navegador, ao ler o seu arquivo HTML, cria uma cópia em memória daquele HTML e a partir dessa cópia ele vai desenhando a sua página,
colocando as tags e aplicando os estilos. Esta cópia é o que chamamos de DOM uma representação em memória do HTML do seu arquivo, que o
navegador usa para desenhar a página, e a variável document é quem contêm o DOM.

Por isso, quando dizemos que com o Javascript nós estamos manipulando o DOM, estamos manipulando o que o navegador renderizou. Então ao trocar
algum texto do DOM, o navegador imediatamente desenha novamente aquele texto, pois o DOM é o que o navegador usa para desenhar o seu site.

Outra caracteristica interessante, é que como manipulamos o DOM , quando trocamos um texto de um <h1> ou um estilo de um elemento, na verdade
estamos alterando a representação em memória , o que faz com que o arquivo fonte que contêm seu HTML fique intacto!
*/