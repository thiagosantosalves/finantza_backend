import RcCategory from '../models/RcCategory';

class RcCategoryController {

    async index(request, response) {

        const id = request.params.id;

        const category = await RcCategory.findByPk(id, {
            where: {user_id: request.userId}
        });

        return response.status(200).json(category)
    }

    async show(request, response) {

        const category = await RcCategory.findAll({
            where: {user_id: request.userId}
        });

        return response.status(200).json(category)
    }   

    async store(request, response) {

        const { name, id_icon, color_hex } = request.body;

        const category = await RcCategory.create({
            name, 
            id_icon, 
            color_hex,
            user_id: request.userId
        });

        return response.status(200).json(category);
    }

    async update(request, response) {

        const { id } = request.params;

        const category = await RcCategory.findByPk(id);
        const newCategory = await category.update(request.body)

        return response.status(200).json(newCategory);
    }
}

export default new RcCategoryController();