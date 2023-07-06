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

        let idCategoryRc = null;
        let idCategoryDp = null;

        if(e.type === 1) {
          idCategoryRc = e.rc_category_id;
          idCategoryDp = null;
        }

        if(e.type === 2) {
          idCategoryDp = e.dp_category_id;
          idCategoryRc = null;
        }

        let res = {
          description: e.description,
          value: e.value,
          rc_category_id: idCategoryRc,
          dp_category_id: idCategoryDp,
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
          return  Number(meta.id_category) === Number(launch.dp_category_id) && 
          Number(meta.month) === Number(launch.month) && 
          Number(meta.year) === Number(launch.year) && launch.type === 2;
        });

        let totalValue = 0;

        filteredLaunches.map(e => {

          if(e.dp_category_id === meta.id_category) {
            totalValue =+ e.value;
            totalValue = Number(totalValue);
          }

          newArray.push({ id: meta.id, id_category: e.dp_category_id, month: e.month, year: e.year, 
            porcent: meta.porcent, status: meta.status, value: totalValue });
        });
      });

      newArray = newArray.reduce((acc, curr) => {
        let obj = acc.find(o => o.id === curr.id);
        
        if(obj) {
          obj.value += parseFloat(curr.value);
        } else {
          acc.push({ 
            id: curr.id,
            id_category: curr.id_category,
            month: curr.month,
            year: curr.year,
            porcent: curr.porcent,
            status: curr.status,
            value: parseFloat(curr.value)
          })
        }

        return acc;
      }, [])

      newArray = meta.map(e => {
        let obj = newArray.find(o => o.id === e.id);
        if(obj) {

          let result = { 
            id: e.id, 
            id_category: e.id_category,
            month: e.month, 
            year: e.year, 
            porcent: e.porcent, 
            status: e.status, 
            value: obj.value += e.used_value,
            meta_value: e.value
          }
          return result;
        } 
      });

      await Releases.bulkCreate(result);

      for(let i = 0; i < newArray.length; i++) {
        const item = newArray[i];

        let newPorcent = parseFloat(item.value) / parseFloat(item.meta_value); 
        newPorcent = newPorcent * 100;
        newPorcent = newPorcent;
       
        let isStatus = false;

        if(newPorcent >= 100) {
          newPorcent = 100;
          isStatus = true;
        } 

        let value = item.value;


        await Meta.update(
          { 
            used_value: value,
            porcent: newPorcent,
            status: isStatus
          },
          { where: { id: item.id, } }
        );
      } 

      return response.status(200).json(result);

    } catch (error) {
      return response.status(400).json({ error: 'Incorrect request.' });     
    }  
  }
}

export default new BankConsolidationController();