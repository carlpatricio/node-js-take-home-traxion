import { HttpStatusCode } from 'axios';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {
  httpCall,
  logger,
} from '../common';
import { GEOLOCATION_SELECTED_FIELDS } from '../common/constants';
import { BaseController } from './base.controller';

export class GeolocationController extends BaseController {
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

  public async handleRequest(
    req: Request<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >,
    res: Response<
      any,
      Record<string, any>
    >,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        cityName,
        stateCode,
        countryCode,
        limit,
      } = req.query;

      const q = `${cityName ?? ''},${
        stateCode ?? ''
      },${countryCode ?? ''}`;
      const params = {
        q,
        limit,
        appid: this.apiKey,
      };
      const { data, status } =
        await httpCall(
          'get',
          `${this.baseUrl}/geo/1.0/direct`,
          params
        );

      if (
        status !== HttpStatusCode.Ok
      ) {
        throw new Error(
          'Error in API response'
        );
      }

      logger.info(
        JSON.stringify({
          type: 'outgoingHTTP',
          status,
          data,
        })
      );

      const filteredData =
        this.filterData(data);

      res
        .status(HttpStatusCode.Ok)
        .json({
          status: HttpStatusCode.Ok,
          data: filteredData,
        });
    } catch (error) {
      next(error);
    }
  }

  private filterData(data: any) {
    const filteredData = data.map(
      (obj: { [key: string]: any }) => {
        const newObj: any = {};
        for (const field of GEOLOCATION_SELECTED_FIELDS) {
          newObj[field] = obj[field];
        }
        return newObj;
      }
    );
    return filteredData;
  }
}
