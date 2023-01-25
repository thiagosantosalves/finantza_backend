import CardCreditReleases from '../models/CardCreditReleases';
import CardCredit from "../models/CardCredit";
import Account from '../models/Account';

class CardCreditReleasesController {

    async index(request, response) {

        try {
            let res = await CardCreditReleases.findByPk(request.params.id);
            return response.status(200).json(res);   
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }

    }

    async show(request, response) {

        try {
            const res = await CardCreditReleases.findAll({
                where: {id_user: request.userId},
                order: [
                    ['id', 'DESC']
                ],
                include: [
                    {
                        model: CardCredit,
                        as: 'card_credit',
                        attributes: ['id', 'name', 'institution', 'id_institution', 'account_id'],
                    },
                    {
                        model: Account,
                        as: 'account',
                        attributes: ['type_id', 'color_hex']
                    }
                ]
            });
            
            return response.status(200).json(res);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }   
    }

    async store(request, response)  {

        try {
            const {
                statuscard,
                month,
                year,
                pay,
                limit_card,
                invoice_amount,
                closes_day,
                wins_day,
                id_card_credit,
                id_account,
            } = request.body;
    
            const res = await CardCreditReleases.create({
                statuscard,
                month,
                year,
                pay,
                limit_card,
                invoice_amount,
                closes_day,
                wins_day,
                id_account,
                id_user: request.userId,
                id_card_credit,
            });
    
            return response.status(200).json(res);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }

    async update(request, response) {

        try {
            let id = request.params.id;
            id = id.split(",");
            
            const res = await CardCreditReleases.update(
                request.body,
                {
                    where: {
                        id: id
                    }
                }
            )
    
            return response.json(res);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new CardCreditReleasesController();