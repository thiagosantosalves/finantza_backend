import RcCategory from '../models/RcCategory';

class RcCategoryController {

    async index(request, response) {

        try {
            const id = request.params.id;

            const category = await RcCategory.findByPk(id, {
                where: {user_id: request.userId}
            });

        return response.status(200).json(category)
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }

    async show(request, response) {

        try {
            const category = await RcCategory.findAll({
                where: {user_id: request.userId}
            });
    
            return response.status(200).json(category)
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }   

    async store(request, response) {

        try {

            const { name, id_icon, color_hex } = request.body;

            const category = await RcCategory.create({
                name, 
                id_icon, 
                color_hex,
                user_id: request.userId
            });

        return response.status(200).json(category);
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }

    async update(request, response) {

        try {
            const { id } = request.params;

            const category = await RcCategory.findByPk(id);
            const newCategory = await category.update(request.body)
    
            return response.status(200).json(newCategory);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new RcCategoryController();