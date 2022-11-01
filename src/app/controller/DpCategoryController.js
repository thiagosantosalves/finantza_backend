import DpCategory from '../models/DpCategory';

class DpCategoryController {

    async index(request, response) {

        const id = request.params.id;

        const category = await DpCategory.findByPk(id, {
            where: {user_id: request.userId}
        });

        return response.status(200).json(category);
    }

    async show(request, response) {

        const category = await DpCategory.findAll({
            where: {user_id: request.userId}
        });

        return response.status(200).json(category);
    }

    async store(request, response) {

        const { name, id_icon, color_hex } = request.body;

        const category = await DpCategory.create({
            name, 
            id_icon, 
            color_hex,
            user_id: request.userId
        });

        return response.status(200).json(category);
    }

    async update(request, response) {
        
        const { id } = request.params;

        const category = await DpCategory.findByPk(id);
        const newCategory = await category.update(request.body)

        return response.status(200).json(newCategory);
    }
}

export default new DpCategoryController();