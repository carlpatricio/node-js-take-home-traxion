import { HttpStatusCode } from 'axios';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { ValidatEMiddleware } from '../../middlewares';

describe(
  ValidatEMiddleware.name,
  () => {
    describe('validate', () => {
      describe('happy path', () => {
        it('should call next if there are no validation errors', () => {
          const req = {} as Request;
          const res = {} as Response;
          const next =
            jest.fn() as NextFunction;

          ValidatEMiddleware.validate(
            req,
            res,
            next
          );

          expect(
            next
          ).toHaveBeenCalled();
        });
      });

      describe('negative scenario', () => {
        it('should respond with a 422 status code and errors if there are validation errors', () => {
          const errors = [
            {
              type: 'field',
              value: undefined,
              msg: 'test is required',
              path: 'test',
              location: 'body',
            },
          ];
          const req: any = {
            'express-validator#contexts':
              [
                {
                  fields: ['test'],
                  location: ['body'],
                  message:
                    'test is required',
                  errors,
                },
              ],
          };
          const res = {
            status: jest
              .fn()
              .mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
          const next =
            jest.fn() as NextFunction;

          ValidatEMiddleware.validate(
            req,
            res,
            next
          );

          expect(
            res.status
          ).toHaveBeenCalledWith(
            HttpStatusCode.UnprocessableEntity
          );
          expect(
            res.json
          ).toHaveBeenCalledWith({
            status:
              HttpStatusCode.UnprocessableEntity,
            errors,
          });
        });
      });
    });
  }
);
