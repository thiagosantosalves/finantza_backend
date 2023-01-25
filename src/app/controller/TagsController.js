import Tags from '../models/Tags';

class TagsController {

    async index(request, response) {

        try {
            const id = request.params.id;

            const tags = await Tags.findByPk(id, {
                where: {user_id: request.userId}
            });
    
            return response.status(200).json(tags);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async show(request, response) {

        try {
            const tags = await Tags.findAll({
                where: {user_id: request.userId},
                order: [
                    ['id', 'DESC']
                ]
            });
     
            return response.status(200).json(tags);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async store(request, response) {

        try {
            const { name } = request.body;

            const tags = await Tags.create({
                name,
                user_id: request.userId
            });
    
            return response.status(200).json(tags);   
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async update(request, response) {

        try {
            const tags = await Tags.findByPk(request.params.id);

            tags.update(request.body);
    
            return response.status(200).json(tags);   
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async delete(request, response) {

        try {
            const tags = await Tags.findByPk(request.params.id);
            tags.destroy();
    
            return response.status(200).json({ msn: 'tag deletada' });
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }
}

export default new TagsController();