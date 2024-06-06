import { HttpStatusCode } from 'axios';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { validationResult } from 'express-validator';

export class ValidatEMiddleware {
  public static validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errors =
      validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(
          HttpStatusCode.UnprocessableEntity
        )
        .json({
          status:
            HttpStatusCode.UnprocessableEntity,
          errors: errors.array(),
        });
    }
    next();
  }
}
