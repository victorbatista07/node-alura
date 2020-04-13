class ProxyFactory {
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            //Interceptar apenas métodos
            get(target, prop, receiver) {
                if(props.includes(prop) && ProxyFactory._isFuncao(target[prop])) {
                    return function() {
                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }

                return Reflect.get(target, prop, receiver);
            },
            //Interceptar propriedades
            set(target, prop, value, receiver) {
                if(props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
                // sempre devo retornar um reflect.set
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _isFuncao(func) {
        return typeof(func) === typeof(Function);
    }
}