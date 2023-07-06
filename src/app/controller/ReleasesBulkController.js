import Releases from '../models/Releases';

class ReleasesBulkController {

    async store(request, response) {

        try {

            let release = request.body.map(e => {

                let res = {
                    description: e.description,
                    account_id: e.account_id,
                    attachment_img: e.account_id,
                    attachment_img_id: e.attachment_img_id,
                    day: e.day,
                    month: e.month,
                    year: e.year,
                    dp_category_id: e.dp_category_id,
                    fixo: e.fixo,
                    installments: e.installments,
                    qd_installments: e.qd_installments, 
                    rc_category_id: e.rc_category_id, 
                    account_origin: e.account_origin,
                    account_destiny: e.account_destiny,
                    card_credit_id: e.card_credit_id,
                    tag: e.tag, 
                    tag_id: e.tag_id, 
                    type: e.type, 
                    value: e.value, 
                    value_installments: e.value_installments,
                    type_payer: e.type_payer,
                    paying_account_name: e.paying_account_name,
                    meta_id: e.meta_id,
                    meta: e.meta,
                    id_fixed_release: e.id_fixed_release,
                    instalments_release_id: e.instalments_release_id,
                    instalments_text: e.instalments_text,
                    user_id: request.userId
                }

                return res;
            });

            const res = await Releases.bulkCreate(release);
            return response.status(200).json(res);
            
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });            
        }

    }   
}

export default new ReleasesBulkController();
