import File from '../models/File';

class FileController {
  async store(req, res) {
    // nome que vem da request: nome que será inserido no banco de dados
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path
    });

    return res.json(file);
  }
}

export default new FileController();
