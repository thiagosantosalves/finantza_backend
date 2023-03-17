import Sequelize,{ Model } from 'sequelize';

class FixedRelease extends Model {
    static init(sequelize) {
        super.init({
            day: Sequelize.INTEGER,
            description: Sequelize.STRING,
            value: Sequelize.FLOAT,
            rc_category_id: Sequelize.INTEGER,
            dp_category_id: Sequelize.INTEGER,
            account_id: Sequelize.INTEGER,
            card_credit_id: Sequelize.INTEGER,
            type: Sequelize.INTEGER,
            paying_account_name: Sequelize.STRING,
            meta_id: Sequelize.INTEGER,
            meta: Sequelize.BOOLEAN,
            user_id: Sequelize.INTEGER,
        }, {
            sequelize
        });

        return this;
    }
}

export default FixedRelease;