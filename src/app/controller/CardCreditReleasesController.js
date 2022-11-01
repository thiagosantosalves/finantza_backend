import CardCreditReleases from '../models/CardCreditReleases';
import CardCredit from "../models/CardCredit";
import Account from '../models/Account';

class CardCreditReleasesController {

    async index(request, response) {

        let res = await CardCreditReleases.findByPk(request.params.id);

        return response.status(200).json(res);
    }

    async show(request, response) {

        const res = await CardCreditReleases.findAll({
            where: {id_user: request.userId},
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
    }

    async store(request, response)  {

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
    }

    async update(request, response) {

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
    }
}

export default new CardCreditReleasesController();