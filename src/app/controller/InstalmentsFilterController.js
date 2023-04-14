
import InstalmentsReleases from "../models/InstalmentsReleases";

class InstalmentsFilterController {

    async index(request, response) {
        try {
            
            const instalments = await InstalmentsReleases.findByPk(request.params.id)

            return response.status(200).json(instalments);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }   
    }

}

export default new InstalmentsFilterController();