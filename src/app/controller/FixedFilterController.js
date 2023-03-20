
import FixedRelease from "../models/fixedRelease";

class FixedFilterController {

    async index(request, response) {
        try {
            
            const fixed = await FixedRelease.findByPk(request.params.id)

            return response.status(200).json(fixed);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }   
    }

}

export default new FixedFilterController();