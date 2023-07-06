import IdDevice from '../models/IdDevice';

class IdDeviceController {
    
    async store(request, response) {

        try {

            const isExist = await IdDevice.findAll({
                where: {
                    id_devices: request.body.id_devices
                }
            });

            if(!isExist.length > 0) {
                
                const res = await IdDevice.create({
                    id_devices: request.body.id_devices,
                    user_id: request.userId,
                });

                return response.status(200).json(res); 
            } else {
                return response.status(400).json({ error: 'id devices no database already exists' });
            } 

        } catch (error) {   
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' });
        }   
    }
}

export default new IdDeviceController();