import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  errorMiddleware,
  loggingMiddleware,
} from './middlewares/';

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000
app.use(express.json());
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
  console.log(
    `Server is listening on port ${port}`
  );
});
