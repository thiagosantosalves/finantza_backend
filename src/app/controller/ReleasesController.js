
import Releases from '../models/Releases';
import Account from '../models/Account';
import CardCredit from '../models/CardCredit';
import RcCategory from '../models/RcCategory';
import DpCategory from '../models/DpCategory';
import Tags from '../models/Tags';
import File from '../models/File';

class ReleasesController {

    async index(request, response) {

        try {
            
            let rules = request.params.rulesfilter.split('&');
            
            const data = await Releases.findAndCountAll( {
                where: { 
                    user_id: request.userId,
                    month: rules[0],
                    year: rules[1],
                },
                order: [
                    ['id', 'DESC']
                ],
                include: [
                    {
                        model: Account,
                        as: 'account',
                        attributes: ['id', 'name', 'type_id', 'type', 'color_hex', 'value']
                    },
                    {
                        model: CardCredit,
                        as: 'card_credit',
                        attributes: ['id', 'name', 'institution', 'id_institution', 'color_hex']
                    },
                    {
                        model: RcCategory,
                        as: 'rc_category',
                        attributes: ['id', 'name', 'id_icon', 'color_hex']
                    },
                    {
                        model: DpCategory,
                        as: 'dp_category',
                        attributes: ['id', 'name', 'id_icon', 'color_hex']
                    },
                    {
                        model: Tags,
                        as: 'tags',
                        attributes: ['id', 'name']
                    },
                    {
                        model: File,
                        as: 'anexo_img',
                        attributes: ['id', 'name', 'url', 'path']
                    }
                ]
            });
    
            const resRc = data.rows.filter(item => item.type === 1 && item.installments === false);
            const resRcInstallments = data.rows.filter(item => item.type === 1 && item.installments === true);
            const resDp = data.rows.filter(item => item.type === 2 && item.installments === false);
            const resDpInstallments = data.rows.filter(item => item.type === 2 && item.installments === true);
            const sum = resRc.reduce((prevVal, elem) => Number(prevVal) + Number(elem.value), 0)
            const sumParc = resRcInstallments.reduce((prevVal, elem) => Number(prevVal) + Number(elem.value_installments), 0);
            const sumD = resDp.reduce((prevVal, elem) => Number(prevVal) + Number(elem.value), 0)
            const sumParcD = resDpInstallments.reduce((prevVal, elem) => Number(prevVal) + Number(elem.value_installments), 0);
    
            const sumRc = Number(sumParc) + Number(sum);
            const sumDp = Number(sumD) + Number(sumParcD);
            const sumTotal = Number(sumRc) - Number(sumDp);
            
            return response.status(200).json({
                sumTotal: sumTotal,
                sumRc: sumRc,
                sumDp: sumDp,
                releases: data.rows
            });
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }

    async store(request, response) {

        try {

            const { 
                description, 
                account_id,
                attachment_img,
                attachment_img_id,
                day,
                month,
                year,
                dp_category_id, 
                fixo,
                installments,
                qd_installments, 
                rc_category_id, 
                account_origin,
                account_destiny,
                card_credit_id,
                tag, 
                tag_id, 
                type, 
                value, 
                value_installments,
                type_payer,
                paying_account_name,
                meta_id,
                meta
            } = request.body;

            const res = await Releases.create({
                description, 
                account_id,
                attachment_img,
                attachment_img_id,
                day,
                month,
                year,
                dp_category_id, 
                fixo,
                installments,
                qd_installments, 
                rc_category_id, 
                account_origin,
                account_destiny,
                card_credit_id,
                tag, 
                tag_id, 
                type, 
                value, 
                value_installments,
                type_payer,
                paying_account_name,
                meta_id,
                meta,
                user_id: request.userId
            });
    
            return response.json(res);
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }

    async update(request, response) {

        try {
            const id = request.params.id;

            const releases = await Releases.findByPk(id);
            const newReleases = await releases.update(request.body);
    
            return response.json(newReleases);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 

        }
    }
}

export default new ReleasesController();