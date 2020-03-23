import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => {
      // tratando o nome do arquivo que esta sendo subido
      crypto.handleBytes(16, (err, res) => {
        if (err) return cb(err);

        // cb(erro, response)
        // result => iojw49f83j4fuw.png
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    }
  })
};
