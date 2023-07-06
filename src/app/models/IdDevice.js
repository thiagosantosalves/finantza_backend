import Sequelize,{ Model } from 'sequelize';

class IdDevice extends Model {
    static init(sequelize) {
        super.init({
            id_devices: Sequelize.STRING,
            user_id: Sequelize.INTEGER
        }, {
            sequelize
        });

        return this;
    }
}

export default IdDevice;