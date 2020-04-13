var criaJogo = function (sprite) {
    var etapa = 1;
    var lacunas = [];
    var palavraSecreta = '';

    var criaLacunas = function () {
        lacunas = Array(palavraSecreta.length).fill('');
    };

    var proximaEtapa = function () {
        etapa = 2;
    };

    var setPalavraSecreta = function (palavra) {
        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    var getLacunas = function () {
        return lacunas;
    };

    var getEtapa = function () {
        return etapa;
    };

    var processaChute = function(chute) {
        var exp = new RegExp(chute, 'gi');
        var resultado;
        var acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {
            acertou = lacunas[resultado.index] = chute;
        }

        if (!acertou) {
            sprite.nextFrame();
        }
    };

    var ganhou = function () {
        return lacunas.length 
            ? !lacunas.some(function(lacuna) {
                return lacuna == '';
            })
            : false;
    };

    var perdeu = function () {
        return sprite.isFinished();
    };

    var ganhouOuPerdeu = function () {
        return ganhou() || perdeu();
    };

    var reinicia = function () {
        etapa = 1;
        palavraSecreta = '';
        lacunas = [];
        sprite.reset();
    };

    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    };
};
