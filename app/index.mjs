import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs/promises';
import { Pdf2Txt } from './lib/pdf2txt.js';
import { deleteFile } from './lib/utils.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

const tmpStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const tmpDir = path.join(__dirname, 'tmp');
      cb(null, tmpDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

const upload = multer({storage: tmpStorage });

app.use(express.json());

app.post('/convert/pdf', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: 'No files were uploaded.'});
    }

    const file = req.file.path;
    const fileOut = req.file.path + '_out';
    const pdf = new Pdf2Txt(file)

    try {
        await pdf.extract(0, null, fileOut)

        res.sendFile(fileOut, {
            headers: {
                'Content-Disposition': `attachment; filename="converted.pdf"`
            }
        })

    } catch (error) {
        return res.status(400).json({error: error });

    } finally {
        await deleteFile(file);
        await deleteFile(fileOut);
    }
})

app.listen(port, '0.0.0.0', () => { console.log(`http://0.0.0.0:${port}`); });