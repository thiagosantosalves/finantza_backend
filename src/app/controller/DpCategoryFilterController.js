import DpCategory from '../models/DpCategory';

class DpCategoryFilterController {

    async index(request, response) {

        let id = request.params.ids;

        id = id.split(',');


        let data = await DpCategory.findAll({
            where: {
                id,
                user_id: request.userId
            }
        });

        return response.status(200).json(data);
    }

}

export default new DpCategoryFilterController();