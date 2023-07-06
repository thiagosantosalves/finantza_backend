import Releases from '../models/Releases';
import CardCreditReleases from '../models/CardCreditReleases';
import CardCredit from '../models/CardCredit';

class ReleaseInstallmentAdjustmentController {

    async update(request, response) {

        try {

            let info = request.params.info;

            info = info.split(',');

            let release = await Releases.findAll({
                where: {
                    instalments_release_id: info[1]
                }
            });

            let newValue = release[0].value - release[0].value_installments;
            
            release = release.filter(e => e.id != info[0]);

            if(release.length > 0) {
         
                for (let index = 0; index < release.length; index++) {
                    const element =  release[index];

                    let qd = index + 1;
                    let text = qd+'/'+release.length;
                    let qdInstallments = element.qd_installments - 1;

                    let releaseUpdate = await Releases.findByPk(element.id);

                    await releaseUpdate.update({
                        value: newValue,
                        instalments_text: text,
                        qd_installments: qdInstallments
                    }); 
                } 
            } 
    
            return response.status(200).json(info);
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' });            
        }
    }

    async delete(request, response) {
        try {

            let info = request.params.info;

            let release = await Releases.findAll({
                where: {
                    instalments_release_id: info
                }
            });

            let data = [];
            for (let index = 0; index < release.length; index++) {
                const element =  release[index];
                let cardRelease = await CardCreditReleases.findAll({
                    where: {
                        id_card_credit: element.card_credit_id,
                        month: element.month,
                        year: element.year
                    }
                });

                data.push(cardRelease[0]);
            } 

            let status = data.filter(e => e.statuscard != 1);

            if(status.length === 0) {

                let cardStatus = await CardCredit.findByPk(release[0].card_credit_id);
                let sumCard = cardStatus.invoice_amount - release[0].value;
           
                await cardStatus.update({
                    invoice_amount: sumCard
                }); 
                
                for (let index = 0; index < release.length; index++) {
                    const element =  release[index];
                    let releaseDelete = await Releases.findByPk(element.id);
                    let cardRelease = await CardCreditReleases.findAll({
                        where: {
                            id_card_credit: element.card_credit_id,
                            month: element.month,
                            year: element.year
                        }
                    });

                    let sum = element.value_installments - cardRelease[0].invoice_amount;
                    let cardReleaseUpdate = await CardCreditReleases.findByPk(cardRelease[0].id);

                    await cardReleaseUpdate.update({
                        invoice_amount: sum,
                    });

                    await releaseDelete.destroy(); 
                }

                return response.status(200).json({status: 0});
            } else {

                return response.status(200).json({status: 1});
            }

        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new ReleaseInstallmentAdjustmentController();