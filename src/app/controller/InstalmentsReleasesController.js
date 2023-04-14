import InstalmentsReleases from "../models/InstalmentsReleases";


class InstalmentsReleasesController {

    async index(request, response) {
        try {

            const day = request.params.day;

            const instalments = await InstalmentsReleases.findAll({
                where: {
                    day: day
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
                user_id: request.userId
            });


            return response.status(200).json(instalments);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

}

export default new InstalmentsReleasesController();