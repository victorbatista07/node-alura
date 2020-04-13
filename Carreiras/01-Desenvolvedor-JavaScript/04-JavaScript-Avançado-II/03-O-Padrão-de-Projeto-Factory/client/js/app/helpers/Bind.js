class Bind {
    // um constructor pode devolver qualquer coisa
    // os três pontos é o operador REST
    constructor(model, view, ...props) {
        let proxy = ProxyFactory.create(model, props, model => view.update(model));
        view.update(model);

        return proxy;
    }
}