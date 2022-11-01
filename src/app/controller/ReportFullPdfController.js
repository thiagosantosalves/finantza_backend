import ejs from 'ejs';
import pdf from 'html-pdf';
import path from 'path';
import fs from 'fs';

class ReportFullPdfController {

    async store(request, response) {

        let data  = request.body;
        let releases = data.report;
        let month = data.month;
        let year = data.year;
        let calc_total = data.calc_total; 
    
        let random = Math.floor(Math.random() * 10000);
        
        ejs.renderFile(path.join(__dirname, '../views/', 'report-full-template.ejs'), 
        {
            releases,
            month,
            year,
            calc_total
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
    }   
}

export default new ReportFullPdfController();