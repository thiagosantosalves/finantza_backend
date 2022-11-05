import Sequelize,{ Model } from 'sequelize';

class Meta extends Model {
    static init(sequelize) {
        super.init({
            month: Sequelize.INTEGER,
            year: Sequelize.INTEGER,
            value: Sequelize.INTEGER,
            used_value: Sequelize.INTEGER,
            porcent: Sequelize.INTEGER,
            status: Sequelize.BOOLEAN,
        }, {
            sequelize
        });

        return this;
    } 
    
    static associate(model) {
        this.belongsTo(model.DpCategory, { foreignKey: 'id_category', as: 'category' });
        this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Meta;