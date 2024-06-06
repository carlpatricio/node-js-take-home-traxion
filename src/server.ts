import { config } from 'dotenv';
import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import { logger } from './common';
import { GeolocationController } from './controller';
import {
  errorMiddleware,
  loggingMiddleware,
} from './middlewares/';
config();
const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000
app.use(express.json());
const geolocationController =
  new GeolocationController();
app.use(
  '/api',
  geolocationController.handleRequest.bind(
    geolocationController
  )
);

app.get(
  '/',
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // res.send('Take home challenge!');
    try {
      throw new Error('Error');
    } catch (error) {
      next(error);
    }
  }
);

app.use(errorMiddleware);
app.use(loggingMiddleware);
app.listen(port, () => {
  logger.info(
    `Server is listening on port ${port}`
  );
});
