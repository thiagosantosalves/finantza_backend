import Releases from "../models/Releases";
import Meta from "../models/Meta";

class ReleaseMetaUpdateController {

    async update(request, response) {
        try {
        
            let id = request.params.id;

            let release = await Releases.findByPk(id);

            if(release.installments) {
                console.log('parcelado');

                let releaseInstallments = await Releases.findAll({
                    where: {    
                        instalments_release_id: release.instalments_release_id
                    }
                });

                releaseInstallments = releaseInstallments.map(e => {
                    let res = {
                        month: e.month,
                        year: e.year,
                        value: e.value_installments,
                        id_category: e.dp_category_id
                    }

                    return res;
                });

                for(let index = 0; index < releaseInstallments.length; index++) {
                    let element = releaseInstallments[index];

                    let meta = await Meta.findAll({
                        where: {
                            month: element.month,
                            year: element.year,
                            id_category: element.id_category
                        }
                    });

                    let metaUpdate = await Meta.findByPk(meta[0].id);

                    let usedValue = Number(element.value) - Number(metaUpdate.used_value);
                    usedValue = usedValue;

                    let newPorcent = usedValue * 100;
                    newPorcent =  Number(newPorcent) / Number(metaUpdate.value);  
                    
                    let status = false;

                    if(newPorcent >= 100 ) {
                        newPorcent = 100;
                        status = true;
                    }

                    metaUpdate.update({
                        used_value: usedValue,
                        porcent: newPorcent,
                        status: status
                    });
                }
            } 

            return response.status(200).json({ msn: true }); 
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new ReleaseMetaUpdateController();