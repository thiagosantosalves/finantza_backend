import File from '../models/File';

class FileController {

    async store(request, response) {

        try {
            const { originalname: name, filename: path } = request.file;

            const file = await File.create({
                name,
                path
            });
    
           
            return response.status(200).json(file); 
        } catch (error) {
            return response.status(400).json({ error: 'Incorrect request.' }); 
        }
    }
}

export default new FileController();