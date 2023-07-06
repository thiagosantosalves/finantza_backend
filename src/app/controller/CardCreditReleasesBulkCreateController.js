import CardCreditReleases from '../models/CardCreditReleases';

class CardCreditReleasesBulkCreateController {

    async store(request, response) {

        try {

            let cardRelease = request.body.map(e => {

                let res = {
                    statuscard: e.statuscard,
                    month: e.month,
                    year: e.year,
                    pay: e.pay,
                    limit_card: e.limit_card,
                    invoice_amount: e.invoice_amount,
                    closes_day: e.closes_day,
                    wins_day: e.wins_day,
                    id_account: e.id_account,
                    id_user: request.userId,
                    id_card_credit: e.id_card_credit,
                }

                return res;
            });

            const res = await CardCreditReleases.bulkCreate(cardRelease);

            return response.status(200).json(res);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });            
        }

    }   
}

export default new CardCreditReleasesBulkCreateController();
