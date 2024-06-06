import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { logger } from '../common';

export class LoggingMiddleware {
  public static handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const startTime = Date.now();
    const {
      url,
      body,
      query,
      method,
      headers,
    } = req;
    logger.info(
      JSON.stringify({
        type: 'request',
        headers,
        url,
        method,
        body,
        query,
      })
    );

    res.on('finish', () => {
      const endTime = Date.now();
      const duration =
        endTime - startTime;

      logger.info(
        JSON.stringify({
          type: 'response',
          statusCode: res.statusCode,
          headers: res.getHeaders(),
          duration,
        })
      );
    });

    next();
  }
}
