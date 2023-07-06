import Releases from "../models/Releases";
import InstalmentsReleases from "../models/InstalmentsReleases";
import Account from "../models/Account";

class InstalmentsReceitaReleasesController {

    async delete(request, response) {

        let id = request.params.id;
        id = id.split('-');
        const instalments = await InstalmentsReleases.findByPk(id[0]);

        let release = await Releases.findAll({
            where: {
                instalments_release_id: id[0]
            }
        });

        let uniqueRelease = await Releases.findByPk(id[1]);

        let remainingAmount = instalments.remaining_amount - 1;
        let amountInstalemts = instalments.amount_instalemts - 1;
        let newText = remainingAmount+'/'+amountInstalemts;
        let newValorInstallments = null;

        newValorInstallments = Number(release[0].value) - Number(release[0].value_installments);
    
        let newValor = newValorInstallments / amountInstalemts;

        await instalments.update({
            value: newValor,
            amount_instalemts: amountInstalemts,
            remaining_amount: remainingAmount,
            instalments_text: newText
        }); 

        release = release.filter(e => e.id != id[1]);

        if(release.length > 0) {
            for (let index = 0; index < release.length; index++) {
                const element =  release[index];
    
                let qd = index + 1;
                let text = qd+'/'+release.length;
                let qdInstallments = element.qd_installments - 1;
    
                let releaseUpdate = await Releases.findByPk(element.id);

                await releaseUpdate.update({
                    value: newValorInstallments,
                    value_installments: newValor,
                    instalments_text: text,
                    qd_installments: qdInstallments
                }); 
            }
        } else {
            let deleteInstallments = await InstalmentsReleases.findByPk(uniqueRelease.instalments_release_id);
            await deleteInstallments.destroy();
        }

        let account = await Account.findByPk(uniqueRelease.account_id);
        let sumAccount = null;

        if(id[2] === "1") {
            sumAccount = Number(account.value) - Number(uniqueRelease.value_installments);
        }

        if(id[2] === "2") {
            sumAccount = Number(account.value) + Number(uniqueRelease.value_installments);
        }
  
        await account.update({
            value: sumAccount
        }); 

        let releaseDelete = await Releases.findByPk(id[1]);
        await releaseDelete.destroy();

        return response.json({msn: true});
    }
}

export default new InstalmentsReceitaReleasesController();