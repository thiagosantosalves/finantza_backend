import Sequelize,{ Model } from 'sequelize';

class Tags extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING
        }, {
            sequelize
        });

        return this;
    }

    static associate(model) {
        this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Tags;