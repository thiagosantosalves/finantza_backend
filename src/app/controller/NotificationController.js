import Notification from "../models/Notification";

class NotificationController {

    async index(request, response) {
        try {
            
            const notification = await Notification.findByPk(request.params.id);

            return response.status(200).json(notification);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async show(request, response) {
        try {
            
            const notification = await Notification.findAll();

            return response.status(200).json(notification);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }
    
    async store(request, response) {

        try {
            
            const {
                description,
                status,
                id_fixed_release,
                id_parcel_release,
             } = request.body;

            const notification = await Notification.create({
                description,
                status,
                id_fixed_release,
                id_parcel_release,
                user_id: request.userId
            })

            return response.status(200).json(notification);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async update(request, response) {
        try {
            
            const notification = await Notification.findByPk(request.params.id);
            let newNotification = await notification.update(request.body);

            return response.status(200).json(newNotification);
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

    async delete(request, response) {
        try {
            
            await Notification.destroy({
                where: {
                    user_id: request.userId
                }
            });

            return response.status(200).json({ msn: 'successfully deleted notification'});
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }
}


export default new NotificationController();