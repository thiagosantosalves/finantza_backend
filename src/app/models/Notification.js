import Sequelize,{ Model } from 'sequelize';

class Notification extends Model {
    static init(sequelize) {
        super.init({
            description: Sequelize.STRING,
            status: Sequelize.BOOLEAN,
            id_fixed_release: Sequelize.INTEGER,
            id_parcel_release: Sequelize.INTEGER,
            user_id: Sequelize.INTEGER,
        }, {
            sequelize
        });

        return this;
    }
}

export default Notification;