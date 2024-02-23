import express, { Router } from 'express';
import * as csvParsingController from '../controllers/csvParsingController';
import multer from 'multer';

const router: Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/parse-csv', upload.single('csvFile'), csvParsingController.parseCSV);

export default router;
