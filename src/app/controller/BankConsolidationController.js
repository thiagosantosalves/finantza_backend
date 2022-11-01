import ofxparser from 'node-ofx-parser';
import fs from 'fs';

class BankConsolidationController {

    async store(request, response) {

        return response.status(200).json({ msn: true })
    }
}

export default new BankConsolidationController();