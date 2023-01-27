import Meta from '../models/Meta';
import DpCategory from '../models/DpCategory';

class MetaFilterController {

    async index(request, response) {
        
        let id = request.params.id

        try {
            const res = await Meta.findAll({
                where: { 
                    user_id: request.userId,
                    id
                },
                include: {
                    model: DpCategory,
                    as: 'category',
                    attributes: ['id', 'name', 'id_icon', 'color_hex']
                }
            });
    
            return response.status(200).json(res);

        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });     
        }
    }
}

export default new MetaFilterController();