import * as OneSignal from '@onesignal/node-onesignal';
const CronJob = require('cron').CronJob;

import FixedRelease from '../../src/app/models/FixedRelease'
import InstalmentsReleases from "../../src/app/models/InstalmentsReleases";
import Meta from '../../src/app/models/Meta';
import Account from '../../src/app/models/Account';
import Releases from '../../src/app/models/Releases';
import IdDevice from '../../src/app/models/IdDevice';
import Notification from '../../src/app/models/Notification';

import formatNumber from './formatNumber';


const ONESIGNAL_APP_ID = '88d61bea-830c-4198-8957-b045e807b780';

const app_key_provider = {
    getToken() {
        return 'ZjRjMGIzOGYtNTQyNy00NjJmLThkNjAtOTY2NWY0NzJmYzg2';
    }
};

const configuration = OneSignal.createConfiguration({
    authMethods: {
        app_key: {
        	tokenProvider: app_key_provider
        }
    }
});

const client = new OneSignal.DefaultApi(configuration);

const date = new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"});
const day = date.split('/')[1];
const month = date.split('/')[0];
const year = date.split(',')[0].split('/')[2];

class ControllerCronRelease {

    async fixedReleases() {
        const job = new CronJob('0 0 * * *', async () => {

            const notification = new OneSignal.Notification();
            notification.app_id = ONESIGNAL_APP_ID;

            const fixed = await FixedRelease.findAll({
                where: {
                    day: day
                }
            }); 

            if(fixed.length > 0) { 

                fixed.map( async e => {

                    let typePlayer = false;
                
                    if(e.account_id) {
                        typePlayer = false;
                    }
        
                    if(e.card_credit_id) {
                        typePlayer = true;
                    }

                    let res = {
                        description: e.description,
                        value: e.value,
                        rc_category_id: e.rc_category_id,
                        dp_category_id: e.dp_category_id,
                        type_payer: typePlayer,
                        account_id: e.account_id,
                        account_origin: null,
                        account_destiny: null,
                        card_credit_id: e.card_credit_id,
                        day: day,
                        month: month,
                        year: year,
                        fixo: true,
                        installments: false,
                        value_installments: 0,
                        qd_installments: - 1,
                        attachment_img: false,
                        attachment_img_id: null,
                        tag: false,
                        type: e.type,
                        tag_id: null,
                        paying_account_name: e.paying_account_name,
                        id_fixed_release: e.id,
                        user_id: e.user_id
                    }

                    let meta = null;

                    if(e.rc_category_id) {
                        meta = await Meta.findAll({
                            where: { 
                                user_id: e.user_id,
                                month: month,
                                year: year,
                                id_category: e.rc_category_id
                            }
                        });
                    }

                    if(e.dp_category_id) {
            
                        meta = await Meta.findAll({
                            where: { 
                                user_id: e.user_id,
                                month: month,
                                year: year,
                                id_category: e.dp_category_id
                            }
                        });
                    }

                    if(meta.length > 0) {

                        let usedValue = e.value + meta[0].used_value;
                        usedValue = usedValue;
                        let newPorcent = usedValue * 100;
                        newPorcent =  Number(newPorcent) / Number(meta[0].value);  

                        let status = false;
        
                        if(newPorcent >= 100 ) {
                            newPorcent = 100;
                            status = true;
                        }

                        let updateMeta = await Meta.findByPk(meta[0].id); 

                        await updateMeta.update({
                            used_value: usedValue,
                            porcent: newPorcent,
                            status: status
                        }); 
                    }

                    const account = await Account.findByPk(e.account_id);

                    let sum = null;
                    let textType = '';

                    if(e.type === 1) {
                        sum =  Number(account.value) + Number(e.value);
                        textType = 'receita';
                    }
                    if(e.type === 2) {
                        sum =  Number(account.value) - Number(e.value);
                        textType = 'despesa';
                    }

                    await account.update({
                        value: sum
                    }); 
            
                    await Releases.create(res);

                    let textMsn = `Novo lançamento/${textType} fixo registrado no valor de ${formatNumber(e.value)}. Agradecemos por utilizar o Finantza!`;            

                    const idDevice = await IdDevice.findAll({
                        where: {
                            user_id: e.user_id
                        }
                    });

                    await Notification.create({
                        description: textMsn,
                        status: false,
                        id_fixed_release: e.id,
                        id_parcel_release: null,
                        user_id: e.user_id
                    });

                    if(idDevice) {

                        notification.include_player_ids = [idDevice[0].id_devices];
                        notification.contents = {
                            en: textMsn
                        };

                        const {id} = await client.createNotification(notification);
                        await client.getNotification(ONESIGNAL_APP_ID, id); 
                    } 
                });
            }

        }, null, true, 'America/Sao_Paulo');

        job.start();
    }

    async installmentsReleases() {

        const job = new CronJob('0 0 * * *', async () => {

            const notification = new OneSignal.Notification();
            notification.app_id = ONESIGNAL_APP_ID;
        
            const instalments = await InstalmentsReleases.findAll({
                where: {
                    day: day,
                }
            }); 

            if(instalments.length > 0) { 

                instalments.map( async e => {

                    let typePlayer = false;
        
                    if(e.account_id) {
                        typePlayer = false;
                    }
        
                    if(e.card_credit_id) {
                        typePlayer = true;
                    }
        
                    let qdP = e.remaining_amount + 1;
                    let valorFinal = e.value * e.amount_instalemts;
                    let res = null;

                    let installmentText = qdP +'/'+qdP;

                    if(e.amount_instalemts < e.remaining_amount || e.amount_instalemts === e.remaining_amount) {
                    
                        const instalmentsDelete = await InstalmentsReleases.findByPk(e.id)
                        instalmentsDelete.destroy();
                        
                    } else { 

                        res = {
                            description: e.description,
                            value: valorFinal,
                            rc_category_id: e.rc_category_id,
                            dp_category_id: e.dp_category_id,
                            type_payer: typePlayer,
                            account_id: e.account_id,
                            account_origin: null,
                            account_destiny: null,
                            card_credit_id: e.card_credit_id,
                            day: day,
                            month: month,
                            year: year,
                            fixo: false,
                            installments: true,
                            instalments_text: installmentText,
                            instalments_release_id: e.id, 
                            value_installments: e.value,
                            qd_installments: qdP,
                            attachment_img: false,
                            attachment_img_id: null,
                            tag: false,
                            type: e.type,
                            tag_id: null,
                            paying_account_name: e.paying_account_name,
                            id_fixed_release: null,
                            user_id: e.user_id
                        }

                        let meta = null;

                        if(e.rc_category_id) {
                            meta = await Meta.findAll({
                                where: { 
                                    user_id: e.user_id,
                                    month: month,
                                    year: year,
                                    id_category: e.rc_category_id
                                }
                            });
                        }

                        if(e.dp_category_id) {
                
                            meta = await Meta.findAll({
                                where: { 
                                    user_id: e.user_id,
                                    month: month,
                                    year: year,
                                    id_category: e.dp_category_id
                                }
                            });
                        }

                        if(meta.length > 0) {

                            let usedValue = e.value + meta[0].used_value;
                            usedValue = usedValue;
                            let newPorcent = usedValue * 100;
                            newPorcent =  Number(newPorcent) / Number(meta[0].value);  

                            let status = false;
            
                            if(newPorcent >= 100 ) {
                                newPorcent = 100;
                                status = true;
                            }

                            let updateMeta = await Meta.findByPk(meta[0].id);

                            await updateMeta.update({
                                used_value: usedValue,
                                porcent: newPorcent,
                                status: status
                            });
                        }

                        const account = await Account.findByPk(e.account_id);

                        let sum = null;
                        let textType = '';

                        if(e.type === 1) {
                            sum =  Number(account.value) + Number(e.value);
                            textType = 'receita';
                        }
                        if(e.type === 2) {
                            sum =  Number(account.value) - Number(e.value);
                            textType = 'despesa';
                        }

                        await account.update({
                            value: sum
                        }); 
                
                        let updateInstalment = await InstalmentsReleases.findByPk(e.id);
                        let instalmentsText = qdP+'/'+updateInstalment.instalments_text.split('/')[1];

                        updateInstalment.update({
                            remaining_amount: qdP,
                            instalments_text: instalmentsText
                        }); 
                
                        await Releases.create(res);

                        let textMsn = `Novo lançamento/${textType} parcelado registrado no valor de ${formatNumber(e.value)}. Agradecemos por utilizar o Finantza!`;            

                        const idDevice = await IdDevice.findAll({
                            where: {
                                user_id: e.user_id
                            }
                        });

                        await Notification.create({
                            description: textMsn,
                            status: false,
                            id_fixed_release: null,
                            id_parcel_release: e.id,
                            user_id: e.user_id
                        });

                        if(idDevice) {

                            notification.include_player_ids = [idDevice[0].id_devices];
                            notification.contents = {
                                en: textMsn
                            };

                            const {id} = await client.createNotification(notification);
                            await client.getNotification(ONESIGNAL_APP_ID, id); 
                        }
                    }
                });
            }

        }, null, true, 'America/Sao_Paulo');

        job.start();
    }
}

export default new ControllerCronRelease();