import File from '../models/File';
import User from '../models/User';
import RcCategory from '../models/RcCategory';
import Dpcategory from '../models/DpCategory';
import Account from '../models/Account';


class userController {

    async index(request, response) {

        const id = request.params.id

        try {
            const user = await User.findOne({
                where: {
                    id: id
                },
                include: {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'url']
                }
            });
            
            return response.status(200).json(user);
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async show(request, response) {

        try {
            const user = await User.findAll()
            
            return response.status(200).json(user);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }    


    async store(request, response) {

        try {
            const { id, name, email, password_hash, id_google, is_google, premium, avatar_id } = await User.create(request.body)

            const rc =  [
                {name: 'Salário', id_icon: '1', color_hex: '#17BA89', user_id: id},
                {name: 'Empréstimos', id_icon: '7', color_hex: '#0D8467', user_id: id},
                {name: 'Investimentos', id_icon: '5', color_hex: '#2F3273',   user_id: id},
                {name: 'Outros', id_icon: '4', color_hex: '#6F5196',  user_id: id},
            ];

            const dp = [
                {name: 'Alimentação', id_icon: '1', color_hex: '#965169', user_id: id},
                {name: 'Assinaturas e serviços', id_icon: '28', color_hex: '#635196', user_id: id},
                {name: 'Casa', id_icon: '31', color_hex: '#449C36', user_id: id},
                {name: 'Compras', id_icon: '18', color_hex: '#C6774B', user_id: id},
                {name: 'Cuidados pessoais', id_icon: '19', color_hex: '#A3214F', user_id: id},
                {name: 'Lazer', id_icon: '2', color_hex: '#06E4F2', user_id: id},
                {name: 'Dívidas e empréstimos', id_icon: '10', color_hex: '#A7351C', user_id: id},
                {name: 'Educação', id_icon: '32', color_hex: '#0D8467', user_id: id},
                {name: 'Família e filhos', id_icon: '8', color_hex: '#BEFF97', user_id: id},
                {name: 'Impostos e taxas', id_icon: '33', color_hex: '#B87512', user_id: id},
                {name: 'Investimentos', id_icon: '34', color_hex: '#032885', user_id: id},
                {name: 'Mercado', id_icon: '16', color_hex: '#BE8C9E', user_id: id},
                {name: 'Pets', id_icon: '20', color_hex: '#6A0429', user_id: id},
                {name: 'Presentes e doações', id_icon: '6', color_hex: '#809651', user_id: id},
                {name: 'Saúde', id_icon: '19', color_hex: '#2DB022', user_id: id},
                {name: 'Trabalho', id_icon: '35', color_hex: '#1F2980', user_id: id},
                {name: 'Transporte', id_icon: '3', color_hex: '#74AD3B', user_id: id},
                {name: 'Viagem', id_icon: '36', color_hex: '#159849', user_id: id},    
                {name: 'Roupas', id_icon: '38', color_hex: '#296215', user_id: id},
                {name: 'Outros', id_icon: '37', color_hex: '#C4C4C4', user_id: id},
            ];

            const accountInitial = {
                name: 'Conta Inicial',
                type_id: 1,
                type: 'Conta corrente',
                color_hex: '#17BA89',
                value: 0,
                is_filed: false,
                user_id: id
            }

            await Account.create(accountInitial);
            await RcCategory.bulkCreate(rc);
            await Dpcategory.bulkCreate(dp);

            return response.status(200).json({
                id,
                name,
                email,
                id_google,
                is_google,
                premium,
                avatar_id,
                password_hash,
            }); 
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async update(request, response) {

        try {
            
            const user = await User.findByPk(request.userId);

            const { name,  email, password, avatar_id  }  = request.body;
    
            const emailExist = await User.findOne({ where: { email  }}); 

            let res = '';

            if(password) {
                res = await user.update({
                    password: password
                });
            } 

            if(emailExist) {
                res = await user.update({
                    name: name,
                    avatar_id: avatar_id,
                });
                return response.status(200).json(res);
            } else {
                res = await user.update({
                    name: name,
                    email: email,
                    avatar_id: avatar_id
                });
                return response.status(200).json(res);
            }
        
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }
}


export default new userController();