import Meta from '../models/Meta';

class MetaReleasesController {

    async put(request, response) {

        try {

            const id = request.params.id;
            const meta = await Meta.findByPk(id);

            const res = await meta.update(request.body);

            return response.status(200).json(res);
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });     
        }  
    }

}

export default new MetaReleasesController();

