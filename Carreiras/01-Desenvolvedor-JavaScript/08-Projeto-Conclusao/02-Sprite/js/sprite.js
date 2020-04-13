function createSprite(selector) {
    // toda variável que amarzena um objeto do jQuery, devo iniciar com um $
    let $el = $(selector);
    let frames = [
        'frame1',
        'frame2',
        'frame3',
        'frame4',
        'frame5',
        'frame6',
        'frame7',
        'frame8',
        'frame9'
    ];
    let current = 0;
    let last = frames.length - 1;

    $el.addClass(frames[current]);

    function moveFrame(from, to) {
        $el.removeClass(from)
        .addClass(to);
    }

    function hasNext() {
        return current + 1 <= last;
    }

    function nextFrame() {
        if(hasNext()) {
            moveFrame(frames[current], frames[++current]);
        }
    }

    var reset = function () {
        moveFrame(frames[current], frames[0]);
        current = 0;
    }

    var isFinished = function () {
        return !hasNext();
    }

    return {
        nextFrame: nextFrame, //exportando as funções
        reset : reset,
        isFinished : isFinished
    };
}

/**
 * Closure: é a capacidade de uma função saber suas propriedades, mesmo após a destruição da função pai
 * Encapsulamento de informações, função chamando função
 * 
 * Um closure (fechamento) é uma função que se "lembra" do ambiente — ou escopo léxico — em que ela foi criada.
 */

 /**
  * function declaration
  * function nomeDaFuncao() {}
  * Toda function declaration vai para o topo do código, no momento da interpretação, estilo um var. Isso se chama fucntion host (colocar a função no topo).
  * Com isso, posso chamar a função antes de declarar a mesma (assinatura). Exemplo:
  * teste();
  * function teste () {}
  * 
  * 
  * function expression
  * var nomeDaVariavel = function () {}
  * Toda function expression fica em sua localização definida, mas a declaração da variável var vai para o topo do código.
  * Diferetemente da function declaration, a expression não permite a sua chamada antes de sua definição
  * Exemplo:
  * nomeDaVariavel();
  * var nomeDaVariavel = function () {}
  * 
  * Isso irá dar erro, porque o código será interpretado assim:
  * 
  * var nomeDaVariavel;
  * nomeDaVariavel();
  * nomeDaVariavel = function () {}
  * 
  * Devo colocar o ; em todas as function expression
  */