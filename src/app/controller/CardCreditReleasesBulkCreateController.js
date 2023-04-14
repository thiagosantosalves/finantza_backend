import CardCreditReleases from '../models/CardCreditReleases';

class CardCreditReleasesBulkCreateController {

    async store(request, response) {

        try {

            const res = await CardCreditReleases.bulkCreate(request.body);

            return response.status(200).json(res);
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' });            
        }

    }   
}

export default new CardCreditReleasesBulkCreateController();
