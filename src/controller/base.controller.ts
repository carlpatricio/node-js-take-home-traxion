import {
  NextFunction,
  Request,
  Response,
} from 'express';

export abstract class BaseController {
  protected abstract handleRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
