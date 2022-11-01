import Sequelize,{ Model } from 'sequelize';

class DpCategory extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            id_icon: Sequelize.SMALLINT,
            color_hex: Sequelize.STRING
        }, {
            sequelize
        });

        return this;
    }

    static associate(model) {
        this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
    }

}

export default DpCategory;