import Sequelize,{ Model } from 'sequelize';

class Account extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            type_id: Sequelize.DECIMAL,
            type: Sequelize.STRING,
            value: Sequelize.FLOAT,
            color_hex: Sequelize.STRING,
            is_filed: Sequelize.BOOLEAN
        }, {
            sequelize
        });

        return this;
    }

    static associate(model) {
        this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Account;
