import Papa from 'papaparse'

export async function getLinhas(url){
    try{
        const response = await fetch(url);
        // Transforma a string csv retornada em uma lista de objetos, 
        // onde os atributos são os cabeçalhos(primeiras linhas) da página da planilha
        const rows = Papa.parse(await response.text(), {header: true});
        if(!rows || rows.length == 0) return "Dados não encontrados";

        return rows;
    }
    catch (e){
        return `Erro: ${e}`;
    }
}

