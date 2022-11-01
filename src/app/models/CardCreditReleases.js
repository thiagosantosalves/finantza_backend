import Sequelize,{ Model } from 'sequelize';

class CardCreditReleases extends Model {
    static init(sequelize) {
        super.init({
            statuscard: Sequelize.INTEGER,        
            month: Sequelize.INTEGER,
            year: Sequelize.INTEGER,
            pay: Sequelize.BOOLEAN,
            limit_card: Sequelize.FLOAT,
            invoice_amount: Sequelize.FLOAT,
            closes_day: Sequelize.INTEGER,
            wins_day: Sequelize.INTEGER,
        }, {
            sequelize
        });
        return this;   
    }

    static associate(model) {
        this.belongsTo(model.User, { foreignKey: 'id_user', as: 'user' });
        this.belongsTo(model.CardCredit, { foreignKey: 'id_card_credit', as: 'card_credit' });
        this.belongsTo(model.Account, { foreignKey: 'id_account', as: 'account' });
    }
}

export default CardCreditReleases;




