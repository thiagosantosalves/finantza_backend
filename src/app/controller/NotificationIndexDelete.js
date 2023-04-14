import Notification from "../models/Notification";

class NotificationIndexDelete {

    async delete(request, response){
        try {
            const notification = await Notification.findByPk(request.params.id);
            notification.destroy();

            return response.status(200).json({ msn: true });
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }

}

export default new NotificationIndexDelete();