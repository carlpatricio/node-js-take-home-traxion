import { AxiosError } from 'axios';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { logger } from '../common';

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
    const {
      status: code,
      message: errMsg,
    } = err;
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
        code,
      })
    );
    const status = code || 500;
    res.status(status).json({
      status,
      message,
      timestamp: new Date(),
    });
    next();
  }
}
