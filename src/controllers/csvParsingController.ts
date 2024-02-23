import { Response } from 'express';
import * as csvParsingService from '../services/csvParsingService';
import { RequestWithFile } from '../interfaces/auth.interface';

export const parseCSV = (req: RequestWithFile, res: Response) => {
  const csvFile = req.file;

  if (!csvFile) {
    return res.status(400).json({ error: 'CSV file is required.' });
  }

  const parsedData = csvParsingService.parseCSV(csvFile.buffer);
  res.json(parsedData);
};
