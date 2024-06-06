import { HttpStatusCode } from 'axios';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { UtilClass } from '../common';
import { BaseController } from './base.controller';

export class WeatherController extends BaseController {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  constructor() {
    super();
    this.baseUrl =
      process.env
        .OPEN_WEATHER_BASE_URL ?? '';
    this.apiKey =
      process.env
        .OPEN_WEATHER_API_KEY ?? '';
  }
  /**
   * Handles the incoming request and sends the response.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next middleware function.
   * @return {Promise<any>} A promise that resolves with the response data.
   */
  public async handleRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (this.apiKey)
        throw new Error(
          'API Key not found'
        );
      const {
        latitude,
        longtitude,
        exclude,
      } = req.query;
      const params = {
        lon: longtitude,
        lat: latitude,
        appid: this.apiKey,
        exclude,
      };

      const { data, status } =
        await UtilClass.httpCall(
          'get',
          `${this.baseUrl}/data/3.0/onecall`,
          params
        );

      if (
        status !== HttpStatusCode.Ok
      ) {
        throw new Error(
          'Error in API response'
        );
      }

      delete data?.lon;
      delete data?.lat;
      const {
        daily,
        minutely,
        hourly,
      } = data;
      return res
        .status(HttpStatusCode.Ok)
        .json({
          status: HttpStatusCode.Ok,
          daily,
          minutely,
          hourly,
        });
    } catch (error) {
      next(error);
    }
  }
}
