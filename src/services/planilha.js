import { spreadsheetId } from '@/constants/sheetNames';

export async function getLinhas(range){
    const {google} = require('googleapis');
    const sheets = google.sheets('v4');
    try{

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId : spreadsheetId,
            range : range
        });

        const rows = response.data.values;
        if(!rows || rows.length == 0) return "Dados não encontrados";

        return rows;
    }
    catch (e){
        return `Erro: ${e}`;
    }
}

