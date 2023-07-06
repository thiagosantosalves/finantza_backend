import FixedRelease from "../models/FixedRelease";

class FixedController {

    async index(request, response) {

        try {
            const day = request.params.day;

            const fixed = await FixedRelease.findAll({
                where: {
                    day: day
                }
            }); 
    
            return response.status(200).json(fixed);
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
            } = request.body;

            const fixed = await FixedRelease.create({
                day,
                description,
                value,
                rc_category_id,
                dp_category_id,
                account_id,
                card_credit_id,
                type,
                paying_account_name,
                user_id: request.userId
            });


            return response.status(200).json(fixed);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async delete(request, response) {
        try {

            const fixed = await FixedRelease.findByPk(request.params.id);
            fixed.destroy();

            return response.json({msn: true});  
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }
}

export default new FixedController();