import { config } from 'dotenv';
import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import { logger } from './common';
import {
  ErrorMiddleware,
  LoggingMiddleware,
} from './middlewares/';
import { setUpRoutes } from './routes';
config();
const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000
app.use(express.json());

/**
 * Routes
 */
setUpRoutes(app);
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

/**
 * Middlewares
 */
app.use(ErrorMiddleware.handleError);
app.use(LoggingMiddleware.handle);
app.listen(port, () => {
  logger.info(
    `Server is listening on port ${port}`
  );
});
