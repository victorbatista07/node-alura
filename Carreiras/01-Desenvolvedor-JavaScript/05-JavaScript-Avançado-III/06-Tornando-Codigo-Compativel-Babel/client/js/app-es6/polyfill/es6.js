if(!Array.prototype.includes) {
    console.log('Polyfill para Array.includes aplicado.');
    Array.prototype.includes = function(elemento) {
        return this.indexOf(elemento) != -1;
    };
}

/**
 * Caso o navegador não possua uma funcionalidade, devo usar um polyfill
 * polyfill emula a funcionalidade no navegador
 */