import multer from 'multer';
import path from 'path';
import fs from 'fs';
import uuidv1 from 'uuid/v1';

const authTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirname = path.resolve(__dirname, '../public/uploads');
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
    cb(null, dirname);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv1() + path.extname(file.originalname));
  }
});

const imageFilter = (req, file, cb) => {
  if (authTypes.includes(file.mimetype)) return cb(null, true);

  cb(new Error('Invalid extension file'));
};

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') return cb(null, true);

  cb(new Error('Invalid extension file'));
};

const pdfUpload = multer({
  storage,
  limits: {
    fileSize: 5242880
  },
  fileFilter: pdfFilter
}).single('fileImage');

const imageUpload = multer({
  storage,
  limits: {
    fileSize: 5242880
  },
  fileFilter: imageFilter
}).single('fileImage');

export { pdfUpload, imageUpload };
