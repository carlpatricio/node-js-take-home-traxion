import { AxiosError } from 'axios';
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
    const { status, message: errMsg } =
      err;
    let message = errMsg;
    if (err instanceof AxiosError) {
      message =
        err.response?.data?.message ??
        message;
    }
    console.log({ err });
    logger.error(
      JSON.stringify({
        err,
        message,
        status,
      })
    );
    res.status(status || 500).json({
      status,
      message,
      timestamp: new Date(),
    });
    next();
  };
export class ErrorMiddleware {
  /**
   * Handles the error that occurred during the request.
   *
   * @param {any} err - The error object.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @return {void} This function does not return anything.
   */
  public static handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { status, message: errMsg } =
      err;
    let message = errMsg;
    if (err instanceof AxiosError) {
      message =
        err.response?.data?.message ??
        message;
    }
    logger.error(
      JSON.stringify({
        err,
        message,
        status,
      })
    );
    res.status(status || 500).json({
      status,
      message,
      timestamp: new Date(),
    });
    next();
  }
}
