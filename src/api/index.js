const URL = "https://storage.googleapis.com/dito-questions/survey-responses.json";

const tipoDeAvaliacao = ['horrivel', 'ruim', 'razoavel', 'muitobom', 'excelente'];


export const getAvaliacoes = (callback) => {

    fecthAvaliacoes((json) => {
        let avaliacoes = {};
        let global = {
            satisfacao: 0,
            totalAvaliacoes: json.length,
            excelente: 0,
            muitobom: 0,
            razoavel: 0,
            ruim: 0,
            horrivel: 0
        }

        json.forEach((a) => {
            let name = a['storeName'];
            let avaliacaoDaLoja = avaliacoes[name] ? avaliacoes[name] : getAvaliacaoDaLoja();
            avaliacaoDaLoja['loja'] = name;
            let tipo = tipoDeAvaliacao[parseInt(a['score']) - 1];
            avaliacaoDaLoja[tipo] = avaliacaoDaLoja[tipo] + 1;
            avaliacaoDaLoja.lojaId = a.storeId;
            global[tipo] = global[tipo] + 1;
            avaliacaoDaLoja.totalAvaliacoes = avaliacaoDaLoja.totalAvaliacoes + 1;
            avaliacaoDaLoja.satisfacao = (avaliacaoDaLoja["excelente"] + avaliacaoDaLoja["muitobom"]) / avaliacaoDaLoja.totalAvaliacoes;
            avaliacoes[name] = avaliacaoDaLoja;
        });

        global.satisfacao = (global.excelente + global.muitobom) / global.totalAvaliacoes;
        global.excelente = global.excelente / global.totalAvaliacoes;
        global.muitobom = global.muitobom / global.totalAvaliacoes;
        global.razoavel = global.razoavel / global.totalAvaliacoes;
        global.ruim = global.ruim / global.totalAvaliacoes;
        global.horrivel = global.horrivel / global.totalAvaliacoes;

        callback({
            global: global,
            avaliacoes: Object.values(avaliacoes)
        });
    });
}

function getAvaliacaoDaLoja() {
    return {
        lojaId: 0,
        loja: "",
        satisfacao: 0,
        totalAvaliacoes: 0,
        horrivel: 0,
        ruim: 0,
        razoavel: 0,
        muitobom: 0,
        excelente: 0
    }
}

function fecthAvaliacoes(callback) {
    var init = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
    };

    return fetch(URL, init)
        .then(response => response.json(), error => console.log('An error occurred.', error))
        .then(json => callback(json));
}