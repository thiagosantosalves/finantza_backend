import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {

    async store(request, response) {

        const { email, password } = request.body;
     
        const user = await User.findOne({ 
            where: { email },
        });

        if(!user) {
            return response.status(400).json({ error: 'Incorrect email entered or does not exist in the database' });
        }

        if (!(await user.checkPassword(password))) {
            return response.status(400).json({ error: 'Password does not match' });
        }

        const { id, name,  } = user;

        return response.status(200).json({
            user:{
                id, 
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                //expiresIn: authConfig.expiresIn
            })
        });
    }

 
}

export default new SessionController();