import Sequelize,{ Model } from 'sequelize';


class Releases extends Model {
    static init(sequelize) {
        super.init({
            description: Sequelize.STRING,
            value: Sequelize.FLOAT,
            day: Sequelize.INTEGER,
            month: Sequelize.INTEGER,
            year: Sequelize.INTEGER,
            fixo: Sequelize.BOOLEAN,
            installments: Sequelize.BOOLEAN,
            value_installments: Sequelize.DECIMAL,
            qd_installments: Sequelize.DECIMAL,
            attachment_img: Sequelize.BOOLEAN,
            tag: Sequelize.BOOLEAN,
            type: Sequelize.INTEGER,
            type_payer: Sequelize.BOOLEAN,
            account_origin: Sequelize.INTEGER,
            account_destiny: Sequelize.INTEGER,
            paying_account_name: Sequelize.STRING,
            meta_id: Sequelize.SMALLINT,
            meta: Sequelize.BOOLEAN
        }, {
            sequelize
        })

        return this;
    }

    static associate(model) {
        this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(model.RcCategory, { foreignKey: 'rc_category_id', as: 'rc_category' });
        this.belongsTo(model.DpCategory, { foreignKey: 'dp_category_id', as: 'dp_category' });
        this.belongsTo(model.Account, { foreignKey: 'account_id', as: 'account' });
        this.belongsTo(model.CardCredit, { foreignKey: 'card_credit_id', as: 'card_credit' });
        this.belongsTo(model.Tags, { foreignKey: 'tag_id', as: 'tags' });
        this.belongsTo(model.File, { foreignKey: 'attachment_img_id', as: 'anexo_img' });
    }
}

export default Releases;