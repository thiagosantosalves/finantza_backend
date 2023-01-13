import Releases from '../models/Releases';
import Meta from '../models/Meta';

class BankConsolidationController {

  async store(request, response) {
      
    try {

      const data = request.body;
      const meta = await Meta.findAll({
          where: {
            user_id: request.userId
          }
      });

      let result = data.map(e => {

        let idCategory = '';

        if(e.type === 1) {
          idCategory = e.rc_category_id;
        }

        if(e.type === 2) {
          idCategory = e.dp_category_id;
        }

        let res = {
          description: e.description,
          value: e.value,
          rc_category_id: idCategory,
          dp_category_id: idCategory,
          type_payer: false,
          account_id: e.account_id,
          account_origin: null,
          account_destiny: null,
          card_credit_id: null,
          day: e.day,
          month: e.month,
          year: e.year,
          fixo: false,
          installments: false,
          value_installments: 0,
          qd_installments: '' - 1,
          attachment_img: false,
          attachment_img_id: null,
          tag: false,
          type: e.type,
          tag_id: null,
          paying_account_name: e.paying_account_name,
          meta_id: null,
          meta: false,
          user_id: request.userId
        }
        
        return res;

      });

      let newArray = [];

      meta.forEach(meta => {
        const filteredLaunches = data.filter(launch => {
          return Number(meta.id_category) === Number(launch.dp_category_id) && 
          Number(meta.month) === Number(launch.month) && 
          Number(meta.year) === Number(launch.year);
        });

        let totalValue = meta.value;

        if (filteredLaunches.length > 0) {
          totalValue += filteredLaunches.reduce((acc, launch) => acc + launch.value, 0);
        }

        filteredLaunches.map(e => {
          newArray.push({ id: meta.id, id_category: e.dp_category_id, month: e.month, year: e.year, 
            porcent: meta.porcent, status: meta.status, value: totalValue });
        });
      });

      newArray = [...new Set(newArray.map(i => JSON.stringify(i)))].map(i => JSON.parse(i));

      await Releases.bulkCreate(result);

      for(let i = 0; i < newArray.length; i++) {
        const item = newArray[i];

        let newPorcent = item.value * 100;

        newPorcent =  Number(newPorcent) / Number(item.value); 
        newPorcent = Number(newPorcent.toFixed(2));

        let isStatus = false;

        if(newPorcent >= 100) {
          newPorcent = 100;
          isStatus = true;
        } 

        await Meta.update(
          { 
            used_value: item.value,
            porcent: newPorcent,
            status: isStatus
          },
          { where: { id: item.id, } }
        )
      }

      return response.status(200).json(result);

    } catch (error) {
      return response.status(400).json({ error: 'Incorrect request.' });     
    }  
  }
}

export default new BankConsolidationController();