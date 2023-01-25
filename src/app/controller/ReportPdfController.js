import ejs from 'ejs';
import pdf from 'html-pdf';
import path from 'path';
import fs from 'fs';

class ReportPdfController {

    async store(request, response) {

        try {
            const data = request.body;
            let releases = data.report;
            let reportRevenue = data.reportRevenue;
            let reportDebt = data.reportDebt;
            let reportTotal = data.reportTotal;
            let date = data.date;

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

            ejs.renderFile(path.join(__dirname, '../views/', 'report-template.ejs'), 
            {
                releases: newReleases,
                reportRevenue,
                reportDebt,
                reportTotal,
                date
            }, (err, data) => {
                if(err) {
                    return response.json(err);
                } else {    
                    let options = {
                        "height": "11.25in",
                        "width": "8.51in",
                        "header": {
                            "height": "20mm"
                        },
                        "footer": {
                            "height": "20mm",
                        },
                    };

                    pdf.create(data, options).toFile(`./src/upload/report${random}.pdf`, function (err, data) {
                        if(err) {
                            return response.json(err);
                        } else {

                            setTimeout(() => {
                                fs.unlink(`./src/upload/report${random}.pdf`, function (err) {
                                    if(err) throw err;
                                    console.log('FIle deleted!');
                                });
                            }, 10000);

                            return response.json({ 
                                status: 'File created sucessfully',
                                url: `http://localhost:3333/files/report${random}.pdf`,
                                namePDF: `report${random}.pdf`
                            });
                        }
                    });
                }
            }); 
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new ReportPdfController();