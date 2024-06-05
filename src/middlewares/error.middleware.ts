import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { ErrorRequestHandler } from 'express-serve-static-core'; // Interface for ErrorRequestHandler
import { logger } from '../common';

export const errorMiddleware: ErrorRequestHandler =
  (
    err,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { status, message } = err;
    logger.error(
      JSON.stringify({
        err,
        message,
        status,
      })
    );
    res.status(status || 500).json({
      err,
      status,
      message,
      timestamp: new Date(),
    });
    next();
  };
