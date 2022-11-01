
import Releases from '../models/Releases';
import Account from '../models/Account';
import CardCredit from '../models/CardCredit';
import RcCategory from '../models/RcCategory';
import DpCategory from '../models/DpCategory';
import Tags from '../models/Tags';
import File from '../models/File';

class ReleasesController {

    async index(request, response) {
        
        const res = await Releases.findByPk(request.params.id, {
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
 
        return response.status(200).json(res);
    }

    async show(request, response) {

        const res = await Releases.findAll({
            where: { user_id: request.userId },
            include: [
                {
                    model: Account,
                    as: 'account',
                    attributes: ['id', 'name', 'type_id', 'type', 'color_hex', 'value' ]
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
        })

        return response.status(200).json(res);
    }
 
    async store(request, response) {

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
            paying_account_name
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
            user_id: request.userId
        });

        return response.json(res);
    }

    async update(request, response) {

        const id = request.params.id;

        const releases = await Releases.findByPk(id);
        const newReleases = await releases.update(request.body);

        return response.json(newReleases);
    }
}

export default new ReleasesController();