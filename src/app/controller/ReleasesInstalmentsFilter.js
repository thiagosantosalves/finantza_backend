import Releases from '../models/Releases';

class ReleasesInstalmentsFilter {

    async index(request, response) {

        try {

            let id = request.params.releaseId;

            let res = await Releases.findAll({
                where : {
                    instalments_release_id: id
                }
            });

            res = res.map(e => {
                let r = e.id+'-'+e.month+'-'+e.year
                return r;
            });


            return response.json(res); 
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }


}

export default new ReleasesInstalmentsFilter();

