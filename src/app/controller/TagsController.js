import Tags from '../models/Tags';

class TagsController {

    async index(request, response) {

        const id = request.params.id;

        const tags = await Tags.findByPk(id, {
            where: {user_id: request.userId}
        });

        return response.status(200).json(tags);
    }

    async show(request, response) {

        const tags = await Tags.findAll({
            where: {user_id: request.userId}
        });
 
        return response.status(200).json(tags);
    }

    async store(request, response) {

        const { name } = request.body;

        const tags = await Tags.create({
            name,
            user_id: request.userId
        });

        return response.status(200).json(tags);
    }

    async update(request, response) {

        const tags = await Tags.findByPk(request.params.id);

        tags.update(request.body);

        return response.status(200).json(tags);
    }

    async delete(request, response) {

        const tags = await Tags.findByPk(request.params.id);
        tags.destroy();

        return response.status(200).json({ msn: 'tag deletada' });
    }

}

export default new TagsController();