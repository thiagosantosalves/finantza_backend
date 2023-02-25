import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {

    async store(request, response) {

        try {
            const { email, password } = request.body;
     
            const user = await User.findOne({ 
                where: { email },
                include: {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'url']
                }
            });

            if(!user) {
                return response.status(400).json({ error: 'Incorrect email entered or does not exist in the database' });
            }
    
            if (!(await user.checkPassword(password))) {
                return response.status(400).json({ error: 'Password does not match' });
            }
    
            const { id, name, avatar } = user;

            return response.status(200).json({
                user:{
                    id, 
                    name,
                    email,
                    avatar
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    //expiresIn: authConfig.expiresIn
                })
            });       
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' });
        }
    }
}

export default new SessionController();