import InstalmentsReleases from "../models/InstalmentsReleases";


class InstalmentsIdReleasesController {

    async index(request, response) {
        try {

            const id = request.params.id;

            const instalments = await InstalmentsReleases.findByPk(id) 

            return response.status(200).json(instalments);
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }        
    }
}

export default new InstalmentsIdReleasesController();