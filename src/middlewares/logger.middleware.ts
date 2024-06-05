import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { logger } from '../common';

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let responseData = '';
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

  res.on('data', (chunk) => {
    console.log({ chunk });
    responseData += chunk;
  });

  const chunks: any = [];

  const oldWrite = res.write;
  const oldEnd = res.end;

  res.write = (
    chunk: any,
    ...args: any[]
  ) => {
    chunks.push(chunk);
    return oldWrite(chunk, ...args);
  };
  res.write = (
    chunk: any,
    ...args: any[]
  ) => {
    console.log(chunk);
    chunks.push(chunk);
    return oldWrite(chunk, ...args);
  };

  res.end = (
    chunk: any,
    ...args: any[]
  ) => {
    if (chunk) {
      chunks.push(chunk);
    }
    return oldEnd(chunk, ...args);
  };

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
};
