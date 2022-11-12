import Meta from '../models/Meta';
import DpCategory from '../models/DpCategory';

class MetaController {

    async index(request, response) {
        
        try {
            let id = request.params.id;

            const res = await Meta.findAll({
                where: { id },
                include: {
                    model: DpCategory,
                    as: 'category',
                    attributes: ['id', 'name', 'id_icon', 'color_hex']
                }
            })
        
        return response.status(200).json(res);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });     
        }
    }

    async show(request, response) {

        try {
            const res = await Meta.findAll({
                where:{ user_id: request.userId },
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

    async store(request, response) {

        const data = request.body;

        let newData = data.map(e => {
            
            let info = {
                month: e.month,
                year: e.year,
                id_category: e.id_category,
                value: e.value,
                used_value: e.used_value,
                porcent: e.porcent,
                status: e.status,
                user_id: request.userId
            }

            return info;
        });

        try {
            const res = await Meta.bulkCreate(newData);
            return response.status(200).json(res);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });     
        }

    }

    async put(request, response) {
        try {

            const id = request.params.id;

            const meta = await Meta.findByPk(id);

            const { newValue } = request.body;
            const usedValue = meta.used_value;

            let newPorcent = usedValue * 100;
            newPorcent =  Number(newPorcent) / Number(newValue); 
            newPorcent = Number(newPorcent.toFixed(2));

            let isStatus = false;

            if(newPorcent >= 100) {
                console.log('entrou');
                newPorcent = 100;
                isStatus = true;
            } 

            const res = await meta.update({
                value: newValue,
                porcent: newPorcent,
                status: isStatus
            });
            
            return response.status(200).json(res);
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });     
        }
    }
}

export default new MetaController();