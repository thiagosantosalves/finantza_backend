import Releases from '../models/Releases';

class BankConsolidationController {

    async store(request, response) {
        
        try {
            const data = request.body;
            await Releases.bulkCreate(data);
            return response.status(200).json({request_status: true});
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });     
        }  
       
    }
}

export default new BankConsolidationController();