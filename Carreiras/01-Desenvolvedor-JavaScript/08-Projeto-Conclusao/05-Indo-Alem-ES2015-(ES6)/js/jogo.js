const criaJogo = sprite => {
    let etapa = 1;
    let lacunas = [];
    let palavraSecreta = '';

    const criaLacunas = () => lacunas = Array(palavraSecreta.length).fill('');

    const proximaEtapa = () => etapa = 2;

    const setPalavraSecreta = palavra => {
        if(!palavra.trim()) {
            throw Error('Palavra secreta inválida!');
        }
        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    const getLacunas = () => lacunas;

    const getEtapa = () => etapa;

    const processaChute = function(chute) {
        if(!chute.trim()) {
            throw Error('Chute inválido!');
        }
        const exp = new RegExp(chute, 'gi');
        let resultado;
        let acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {
            acertou = lacunas[resultado.index] = chute;
        }

        if (!acertou) {
            sprite.nextFrame();
        }
    };

    const ganhou = () => lacunas.length 
            ? !lacunas.some(function(lacuna) {
                return lacuna == '';
            })
            : false;

    const perdeu = () => sprite.isFinished();

    const ganhouOuPerdeu = () => ganhou() || perdeu();

    const reinicia = () => {
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
