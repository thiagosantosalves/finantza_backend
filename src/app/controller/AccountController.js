import Account from '../models/Account';

class AccountController {

    async index(request, response) {

        try {
            const res = await Account.findByPk(request.params.id);

            return response.status(200).json(res);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 


        }       
    }

    async show(request, response) {

        try {
            const accountFull = await Account.findAll({
                where: { user_id: request.userId }
            });
    
            return response.status(200).json(accountFull); 

        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 

        }
    }

    async store(request, response) {

        try {

            const { name, type_id, type, color_hex, value, is_filed } = request.body;
            
            const account = await Account.create({
                name,
                type_id, 
                type, 
                color_hex, 
                value, 
                is_filed,
                user_id: request.userId
            });
          
            return response.status(200).json(account);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }

    async update(request, response) {

        try {
            const { id } = request.params;

            const account = await Account.findByPk(id);
            const newAccount = await account.update(request.body);

            return response.status(200).json(newAccount);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new AccountController();