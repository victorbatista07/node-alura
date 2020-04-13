import { View } from './View';
//importando alguma coisa do módulo (arquivo) View.js
//módulo são arquivos .js e não são acessível globalmente
export class MensagemView extends View {
    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
}

/**
 * É conhecidencia o móduglo (arquivo) possuir o mesmo nome que o artefato (classe function...)
 * que está sendo exportado para outros arquivos importar
 */