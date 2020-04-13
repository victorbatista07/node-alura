// trabalhando com herança. Uso o extends
// Se estou usando herança e possuo o mesmo constructor, não preciso chamar o construtor super(), porque o javascript sabe que estou referenciando o construtor da classe pai
class MensagemView extends View {
    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
}