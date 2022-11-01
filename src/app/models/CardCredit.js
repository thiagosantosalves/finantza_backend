import Sequelize,{ Model } from 'sequelize';

class CardCredit extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            id_institution: Sequelize.SMALLINT,
            institution: Sequelize.STRING,
            limit_card: Sequelize.FLOAT,
            invoice_amount: Sequelize.FLOAT,
            closes_day: Sequelize.DECIMAL,
            wins_day: Sequelize.DECIMAL,
            status: Sequelize.BOOLEAN,
            is_filed: Sequelize.BOOLEAN ,
            color_hex: Sequelize.STRING
        }, {
            sequelize
        });

        return this;
    }

    static associate(model) {
        this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(model.Account, { foreignKey: 'account_id', as: 'account' });
    }
}

export default CardCredit; 