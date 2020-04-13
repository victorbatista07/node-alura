class HttpService {
    _handleErros(res) {
        if(res.ok) {
            return res;
        } else {
            throw new Error(res.statusText); //retornando a mensagem de erro do servidor
        }
    }

    get(url) {
        //fetch é uma API de escobo global. ELa facilita as requisições. Não consigo cancelar a requisição
        //A resposta retornada pelo fetch é bruta (não é JSON, nem XML..), devo solicitar para ela se formatar
        return fetch(url)
        //sempre que eu trabalhar com a fetch API, devo verificar se retornou algum erro
            .then(res => this._handleErros(res)) //vendo se o servidor retornou algum erro
            .then(res => res.json()); //o .json() faz com que a resposta se converta automaticamente
    }

    post(url, dado) {
        return fetch(url, {
            //o headers é para configurar o cabeçalho do post
            headers: { 'Content-type' : 'application/json' },
            //o tipo da requisição
            method: 'post',
            //o body da requisição deve ser em string
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErros(res));
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();

        //     xhr.open("POST", url, true);
        //     xhr.setRequestHeader("Content-type", "application/json");
        //     xhr.onreadystatechange = () => {
        //         if (xhr.readyState == 4) {
        //             if (xhr.status == 200) {
        //                 resolve(JSON.parse(xhr.responseText));
        //             } else {
        //                 reject(xhr.responseText);
        //             }
        //         }
        //     };

        //     xhr.send(JSON.stringify(dado));
        // });
    }
}
