import fs from 'fs';
import { resolve } from 'path';

import File from '../models/File';
import Account from '../models/Account';
import CardCreditReleases from '../models/CardCreditReleases';
import CardCredit from '../models/CardCredit';
import DpCategory from '../models/DpCategory';
import RcCategory from '../models/RcCategory';
import Meta from '../models/Meta';
import Tags from '../models/Tags';
import Releases from '../models/Releases';

class HistoryDeleteController {

    async store(request, response) {

        const id = request.userId;

        try {

            await Account.destroy({
                where: {
                    user_id: id
                }
            });
    
            await CardCreditReleases.destroy({
                where: {
                    id_user: id
                }
            });
    
            await CardCredit.destroy({
                where: {
                    user_id: id
                }
            });
    
            await DpCategory.destroy({
                where: {
                    user_id: id
                }
            });
    
            await RcCategory.destroy({
                where: {
                    user_id: id
                }
            });
    
            await Meta.destroy({
                where: {
                    user_id: id
                }
            });
    
            await Tags.destroy({
                where: {
                    user_id: id
                }
            });
    
            await Releases.destroy({
                where: {
                    user_id: id
                }
            });
    
            let files = await File.findAll({
                where: {
                    id_user: id
                }
            }); 
    
            files.forEach(e => {
                fs.unlink( resolve(__dirname, '../../upload/'+e.path), function (err) { 
                    if(err) throw err;
                });
            });
    
            await File.destroy({
                where: {
                    id_user: id
                }
            });

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
            await DpCategory.bulkCreate(dp);
    
            return response.status(200).json({ masn: true }); 
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });    
        }
    }
}

export default new HistoryDeleteController();