import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata'; // Required for TypeORM
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routesAuth from './routes/auth';
import routesAmenities from './routes/amenities';
import routeBbookings from './routes/bookings';
import routeFiles from './routes/files';
import { AppDataSource } from './data-source';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(hpp());

app.use('/api/auth', routesAuth);
app.use('/api/amenities', routesAmenities);
app.use('/api/bookings', routeBbookings);
app.use('/api/files', routeFiles);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: 'Example docs',
    },
  },
  apis: ['swagger.yaml'],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT: number = parseInt(process.env.PORT || '3000', 10);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('Error: ', error));
