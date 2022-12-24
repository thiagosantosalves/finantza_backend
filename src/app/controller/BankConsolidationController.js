import Releases from '../models/Releases';

class BankConsolidationController {

    async store(request, response) {
       
      
        return response.status(200).json({msn: true});
    }
}

export default new BankConsolidationController();