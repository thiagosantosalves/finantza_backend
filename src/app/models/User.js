import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model { 
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            is_google: Sequelize.BOOLEAN,
            premium: Sequelize.BOOLEAN
        }, {
            sequelize
        });

        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        }); 

        return this;
    }

    static associate(model) {
        this.belongsTo(model.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;