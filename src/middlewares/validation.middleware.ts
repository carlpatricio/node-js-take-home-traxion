import { HttpStatusCode } from 'axios';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { validationResult } from 'express-validator';
/**
 * Validates the request using the express-validator library. If there are any validation errors,
 * it responds with a 422 Unprocessable Entity status code and the errors array. Otherwise, it
 * calls the next middleware function.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void} This function does not return anything.
 */
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
