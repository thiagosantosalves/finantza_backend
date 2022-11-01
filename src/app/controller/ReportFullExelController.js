import ExcelJS from 'exceljs';
import fs from 'fs';

class ReportFullExelController {
    
    async store(request, response) {

        const data = request.body;

        let random = Math.floor(Math.random() * 10000);

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Primeira Aba');

        sheet.columns = [
            { header: 'Descrição', key: 'label' },
            { header: 'Porcentagem', key: "porcent" },
            { header: 'Valor', key: 'value' },
        ];

        sheet.addRows(data);

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

export default new ReportFullExelController();