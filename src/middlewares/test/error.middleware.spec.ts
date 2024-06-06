import {
  AxiosError,
  HttpStatusCode,
} from 'axios';
import {
  NextFunction,
  Request,
} from 'express';
import { ErrorMiddleware } from '../../middlewares';

describe(ErrorMiddleware.name, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('handleError', () => {
    it('should handle an error and log it', () => {
      // Arrange
      const errorMessage =
        'An error occurred';
      const req: Request =
        {} as Request;
      const res: any = {
        status: jest
          .fn()
          .mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction =
        jest.fn();

      // Act
      ErrorMiddleware.handleError(
        { message: errorMessage },
        req,
        res,
        next
      );

      // Assert
      expect(
        res.status
      ).toHaveBeenCalledWith(
        HttpStatusCode.InternalServerError
      );
      expect(
        res.json
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          status:
            HttpStatusCode.InternalServerError,
          message: errorMessage,
        })
      );
    });

    it('should handle an AxiosError and log the error message from the response', () => {
      // Arrange
      const axiosError: AxiosError = {
        isAxiosError: false,
        toJSON: jest.fn(),
        name: 'AxiosError',
        message: 'This is axios error',
      };
      const req: any = {};
      const res: any = {
        status: jest
          .fn()
          .mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction =
        jest.fn();

      // Act
      ErrorMiddleware.handleError(
        axiosError,
        req,
        res,
        next
      );

      // Assert
      expect(
        res.status
      ).toHaveBeenCalledWith(
        HttpStatusCode.InternalServerError
      );
      expect(
        res.json
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          status:
            HttpStatusCode.InternalServerError,
          message: axiosError.message,
        })
      );
    });
  });
});
