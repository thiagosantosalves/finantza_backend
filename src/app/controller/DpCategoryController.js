import DpCategory from '../models/DpCategory';

class DpCategoryController {

    async index(request, response) {

        try {
            const id = request.params.id;

            const category = await DpCategory.findByPk(id, {
                where: {user_id: request.userId}
            });
    
            return response.status(200).json(category);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
       
    }

    async show(request, response) {

        try {
            const category = await DpCategory.findAll({
                where: {user_id: request.userId}
            });
    
            return response.status(200).json(category);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }        
    }

    async store(request, response) {

        try {
            const { name, id_icon, color_hex } = request.body;

            const category = await DpCategory.create({
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

            const category = await DpCategory.findByPk(id);
            const newCategory = await category.update(request.body)
    
            return response.status(200).json(newCategory);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }  
    }
}

export default new DpCategoryController();