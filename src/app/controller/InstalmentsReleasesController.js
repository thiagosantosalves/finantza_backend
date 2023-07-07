import InstalmentsReleases from "../models/InstalmentsReleases";
import Releases from "../models/Releases";
import Account from "../models/Account";


class InstalmentsReleasesController {

    async index(request, response) {
        try {

            const day = request.params.day;

            const instalments = await InstalmentsReleases.findAll({
                where: {
                    day: day,
                    user_id: request.userId
                }
            }); 

            return response.status(200).json(instalments);
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }        
    }

    async store(request, response) {

        try {

            const { 
                day, 
                description, 
                value, 
                rc_category_id,
                dp_category_id, 
                account_id,
                card_credit_id,
                type,
                paying_account_name,
                instalments_release,
                amount_instalemts,
                remaining_amount,
                instalments_text
            } = request.body;

            const instalments = await InstalmentsReleases.create({
                day,
                description,
                value,
                rc_category_id,
                dp_category_id,
                account_id,
                card_credit_id,
                type,
                paying_account_name,
                instalments_release,
                amount_instalemts,
                remaining_amount,
                instalments_text,
                user_id: request.userId
            });


            return response.status(200).json(instalments);
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async update(request, response) {

        try {
            
            const id = request.params.id;

            const installments = await InstalmentsReleases.findByPk(id);
            const res = await installments.update(request.body);
    
            return response.json(res);

        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }

    }

    async delete(request, response) {
        try {

            let id = request.params.id;
            id = id.split('-');
            const instalments = await InstalmentsReleases.findByPk(id[0]);

            let account = await Account.findByPk(instalments.account_id)
            let instalmentQd = instalments.value * instalments.amount_instalemts;
            let sum = null;

            if(id[1] === "1") {
                sum = Number(account.value) - Number(instalmentQd);
            }
    
            if(id[1] === "2") {
                sum = Number(account.value) + Number(instalmentQd);
            }

            let release = await Releases.findAll({
                where: {
                    instalments_release_id: instalments.id.toString()
                }
            });

            for (let index = 0; index < release.length; index++) {
                const element = release[index];
                let deleteRelease = await Releases.findByPk(element.id);
                await deleteRelease.destroy(); 
            }

            account.update({
                value: sum
            });

            instalments.destroy();

            return response.status(200).json({ msn: true });
            
        } catch (error) {
            
            return response.status(400).json({ error: 'Incorrect request.' });
        }        
    }
}

export default new InstalmentsReleasesController();