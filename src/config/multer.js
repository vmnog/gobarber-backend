import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => {
      // tratando o nome do arquivo que esta sendo subido
      crypto.randomBytes(16, (err, res) => {
        if (err) return err;

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    }
  })
};
