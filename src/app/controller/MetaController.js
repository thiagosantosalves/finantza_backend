import Meta from '../models/Meta';
import DpCategory from '../models/DpCategory';

class MetaController {

    async index(request, response) {

        let id = request.params.id;

        const res = await Meta.findAll({
            where: { id },
            include: {
                model: DpCategory,
                as: 'category',
                attributes: ['name', 'id_icon', 'color_hex']
            }
        })
        
        return response.status(200).json(res);
    }

    async show(request, response) {

        const res = await Meta.findAll({
            where:{ user_id: request.userId },
            include: {
                model: DpCategory,
                as: 'category',
                attributes: ['name', 'id_icon', 'color_hex']
            }
        });

        return response.status(200).json(res);
    }

    async store(request, response) {

        const { 
            month, 
            year, 
            id_category, 
            value,
            used_value,
            porcent,
            status
        } = request.body;

        const res = await Meta.create({
            month, 
            year, 
            id_category, 
            value,
            used_value,
            porcent,
            status,
            user_id: request.userId
        });

        return response.status(200).json(res);
    }

    async put(request, response) {

        const id = request.params.id;

        const meta = await Meta.findByPk(id);
        const res = await meta.update(request.body);
        
        return response.status(200).json(res);
    }
}

export default new MetaController();