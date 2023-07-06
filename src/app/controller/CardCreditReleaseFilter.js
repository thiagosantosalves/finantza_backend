import CardCreditReleases from '../models/CardCreditReleases';
import CardCredit from "../models/CardCredit";
import Account from '../models/Account';

class CardCreditReleaseFilter {

    async index(request, response) {

        try {
            
            let filter = request.params.filter;
            filter = filter.split('-');

            let res = await CardCreditReleases.findAll({
                where: {
                    id_card_credit: filter[0],
                    month: filter[1],
                    year: filter[2],
                },
                include: [
                    {
                        model: CardCredit,
                        as: 'card_credit',
                        attributes: ['id', 'name', 'institution', 'id_institution', 'account_id', 'invoice_amount', 'limit_card'],
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

}

export default new CardCreditReleaseFilter;