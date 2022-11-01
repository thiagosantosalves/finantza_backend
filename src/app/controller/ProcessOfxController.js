import ofxparser from 'node-ofx-parser';
import fs from 'fs';

class ProcessOfxController {

    async store(request, response) {
        const fileOfx = request.file;
        let nameFile = fileOfx.filename.split('.');

        function doTruncarStr(str, size){
            if (str==undefined || str=='undefined' || str =='' || size==undefined || size=='undefined' || size ==''){
                return str;
            }
             
            var shortText = str;
            if(str.length >= size+3){
                shortText = str.substring(0, size).concat('...');
            }
            return shortText;
        }   

        if(nameFile[1] === 'ofx') {

            fs.readFile(fileOfx.path, 'utf8', function(err, ofxData) {
                if (err) throw err;
            
                const data = ofxparser.parse(ofxData);
    
                const releasesCredit = data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.filter(e => e.TRNTYPE === 'CREDIT');
                const releasesDebit = data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.filter(e => e.TRNTYPE === 'DEBIT');
            
                const resDebit = releasesDebit.map(e => {

                    let newValor = e.TRNAMT.split('-');
                    newValor = Number(newValor[1]);

                    let day = e.DTPOSTED.substring(6, 8);
                    let year = e.DTPOSTED.substring(0, 4);
                    let month = e.DTPOSTED.substring(4, 6);
                    month = month.replace(/^(0+)(\d)/g,"$2");
                    day = day.replace(/^(0+)(\d)/g,"$2");

                    let release = {
                        description: doTruncarStr(e.MEMO, 60),
                        value: newValor,
                        type: 0,
                        typeName: e.TRNTYPE,
                        date: e.DTPOSTED,
                        day,
                        month,
                        year,
                    }
    
                    return release;
                });

                const resCredit = releasesCredit.map(e => {

                    let day = e.DTPOSTED.substring(6, 8);
                    let year = e.DTPOSTED.substring(0, 4);
                    let month = e.DTPOSTED.substring(4, 6);
                    month = month.replace(/^(0+)(\d)/g,"$2");
                    day = day.replace(/^(0+)(\d)/g,"$2");

                    let release = {
                        description: doTruncarStr(e.MEMO, 60),
                        value: Number(e.TRNAMT),
                        type: 1,
                        typeName: e.TRNTYPE,
                        date: e.DTPOSTED,
                        day,
                        month,
                        year,
                    }
    
                    return release;
                });

                setTimeout(() => {
                    fs.unlink(fileOfx.path, function (err) {
                        if(err) throw err;
                        console.log('FIle deleted!');
                    });
                }, 10000);

                const res = resCredit.concat(resDebit);
    
                return response.status(200).json(res);
            }); 
        
        } else {
            setTimeout(() => {
                fs.unlink(fileOfx.path, function (err) {
                    if(err) throw err;
                    console.log('FIle deleted!');
                });
            }, 1000);

            return response.status(415).json({ error: 'The file type is not valid!' });
        }   
    }
}

export default new ProcessOfxController();