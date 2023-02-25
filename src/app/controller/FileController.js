import fs from 'fs';
import { resolve } from 'path';

import File from '../models/File';

class FileController {

    async

    async store(request, response) {

        try {
            const { originalname: name, filename: path } = request.file;

            const file = await File.create({
                name,
                path,
                id_user: request.userId
            });
    
            return response.status(200).json(file); 
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }

    async delete(request, response) {


        try {
            

            let file = await File.findByPk(request.params.id);
                     
            fs.unlink( resolve(__dirname, '../../upload/'+file.path), function (err) { 
                if(err) throw err;
                console.log('FIle deleted!');
            });
 
            file.destroy();

            return response.status(200).json(file); 
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new FileController();