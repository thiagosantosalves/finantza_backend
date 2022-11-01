import Account from '../models/Account';

import path from "path";
import fs from 'fs';

class AccountController {

    async index(request, response) {

        const res = await Account.findByPk(request.params.id);

        return response.status(200).json(res);
    }

    async show(request, response) {

        const accountFull = await Account.findAll({
            where: { user_id: request.userId }
        });

        return response.status(200).json(accountFull); 
    }

    async store(request, response) {

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
    }

    async update(request, response) {

        const { id } = request.params;

        const account = await Account.findByPk(id);
        const newAccount = await account.update(request.body);

        return response.status(200).json(newAccount);
    }
}

export default new AccountController();