import ExcelJS from 'exceljs';
import fs from 'fs';

class ReportReleasesController {

    async store(request, response) {

        let releases = request.body;

        releases = releases.filter(item => item.type != 3);

        const newReleases = releases.map(item => {

            let nameType = '';
            let nameAccount = '';
            if(item.type === 1) {
                nameType = 'receita'}

            if(item.type === 2) {
                nameType = 'despesa'
            }

            if(item.card_credit_id != null) {
                nameAccount = item.card_credit.name;
            } 
            
            if(item.account_id != null && item.card_credit_id === null) {
                nameAccount = item.account.name;
            }

            let newReleases = {
                description: item.description,
                account: nameAccount,
                category: item.type === 1 ? item.rc_category.name : item.dp_category.name,
                type: nameType,
                status: item.type_payer ? 'a pagar' : 'pago',
                value: item.value
            }
            return newReleases

        }); 

        let random = Math.floor(Math.random() * 10000);

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Primeira Aba');

        sheet.columns = [
            { header: 'Descrição', key: 'description' },
            { header: 'Conta', key: 'account' },
            { header: 'Categoria', key: 'category' },
            { header: 'Tipo', key: 'type' },
            { header: 'Status', key: 'status' },
            { header: 'valor', key: 'value' },
            
        ];
        sheet.addRows(newReleases);

        sheet.getRow(1).font = {
            bold: true,
            color: { argb: 'FFCCCCCC' }
        }

        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            bgColor: { argb: 'FF000000' }
        }

        sheet.workbook.csv.writeFile(`./src/upload/report${random}.csv`);

        setTimeout(() => {
            fs.unlink(`./src/upload/report${random}.csv`, function (err) {
                if(err) throw err;
                console.log('FIle deleted!');
            });
        }, 20000);

        return response.json({ 
            status: 'File created sucessfully',
            url: `http://localhost:3333/files/report${random}.csv`,
            nameCSV: `report${random}.csv`,
        });
    }

}

export default new ReportReleasesController();