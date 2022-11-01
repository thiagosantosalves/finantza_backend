import CardCredit from "../models/CardCredit";
import Account from '../models/Account';
import CardCreditReleases from '../models/CardCreditReleases';

class CardCreditController {

    async index(request, response) {

        const id = request.params.id;

        const card = await CardCredit.findByPk(id, {
            where: { user_id: request.userId },
            include: [
                {
                    model: Account,
                    as: 'account',
                    attributes: ['id', 'name', 'type_id', 'type', 'color_hex', 'value' ]
                }
            ]
        });
        
        return response.json(card);
    }

    async show(request, response) {

        const card = await CardCredit.findAll({
            where: {user_id: request.userId},
            include: [
                {
                    model: Account,
                    as: 'account',
                    attributes: ['id', 'name', 'type_id', 'type', 'color_hex', 'value']
                }
            ]
        });

        let newCard = card.map(e => {
            
            let valueAvailable = Number(e.limit_card) - Number(e.invoice_amount);

            let res = {
                id: e.id,
                name: e.name,
                id_institution: e.id_institution,
                institution: e.institution,
                limit_card: e.limit_card,
                invoice_amount: e.invoice_amount,
                closes_day: e.closes_day,
                wins_day: e.wins_day,
                status: e.status,
                is_filed: e.is_filed,
                color_hex: e.color_hex,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                user_id: e.user_id,
                account_id: e.account_id,
                valueAvailable: valueAvailable,
                account: e.account,
                
            }

            return res;
        });

        return response.json(newCard);
    }

    async store(request, response) {

        const date = new Date();
        
        const { 
            name,
            id_institution,
            institution,
            limit_card,
            invoice_amount,
            closes_day,
            wins_day,
            status,
            is_filed, 
            account_id, 
            color_hex
        } = request.body;

        const card = await CardCredit.create({
            name,
            id_institution,
            institution,
            limit_card,
            invoice_amount,
            closes_day,
            wins_day,
            status,
            is_filed, 
            color_hex,
            user_id: request.userId,
            account_id,
        });

        await CardCreditReleases.create({
            statuscard: 1,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            pay: false,
            limit_card,
            invoice_amount: 0,
            closes_day,
            wins_day,
            id_account: account_id,
            id_user: request.userId,
            id_card_credit: card.id,
        });

        return response.json(card);
    }

    async update(request, response) {

        const id = request.params.id;

        const cardFind = await CardCredit.findByPk(id);
        const card = await cardFind.update(request.body);

        return response.json(card);
    }
}

export default new CardCreditController();