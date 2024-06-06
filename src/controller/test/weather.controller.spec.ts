import { HttpStatusCode } from 'axios';
import { UtilClass } from '../../common';
import { WeatherController } from '../weather.controller';

describe(WeatherController.name, () => {
  let weatherController: WeatherController;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      query: {
        latitude: '37.7749',
        longtitude: '-122.4194',
        exclude: 'current,minutely',
      },
    };
    mockResponse = {
      status: jest
        .fn()
        .mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    weatherController =
      new WeatherController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle request successfully', async () => {
    const mockData = {
      lat: 33.44,
      lon: -94.04,
      timezone: 'America/Chicago',
      timezone_offset: -18000,
      current: {
        dt: 1684929490,
        sunrise: 1684926645,
        sunset: 1684977332,
        temp: 292.55,
        feels_like: 292.87,
        pressure: 1014,
        humidity: 89,
        dew_point: 290.69,
        uvi: 0.16,
        clouds: 53,
        visibility: 10000,
        wind_speed: 3.13,
        wind_deg: 93,
        wind_gust: 6.71,
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description:
              'broken clouds',
            icon: '04d',
          },
        ],
      },
      minutely: [
        {
          dt: 1684929540,
          precipitation: 0,
        },
      ],
      hourly: [
        {
          dt: 1684926000,
          temp: 292.01,
          feels_like: 292.33,
          pressure: 1014,
          humidity: 91,
          dew_point: 290.51,
          uvi: 0,
          clouds: 54,
          visibility: 10000,
          wind_speed: 2.58,
          wind_deg: 86,
          wind_gust: 5.88,
          weather: [
            {
              id: 803,
              main: 'Clouds',
              description:
                'broken clouds',
              icon: '04n',
            },
          ],
          pop: 0.15,
        },
      ],
      daily: [
        {
          dt: 1684951200,
          sunrise: 1684926645,
          sunset: 1684977332,
          moonrise: 1684941060,
          moonset: 1684905480,
          moon_phase: 0.16,
          summary:
            'Expect a day of partly cloudy with rain',
          temp: {
            day: 299.03,
            min: 290.69,
            max: 300.35,
            night: 291.45,
            eve: 297.51,
            morn: 292.55,
          },
          feels_like: {
            day: 299.21,
            night: 291.37,
            eve: 297.86,
            morn: 292.87,
          },
          pressure: 1016,
          humidity: 59,
          dew_point: 290.48,
          wind_speed: 3.98,
          wind_deg: 76,
          wind_gust: 8.92,
          weather: [
            {
              id: 500,
              main: 'Rain',
              description: 'light rain',
              icon: '10d',
            },
          ],
          clouds: 92,
          pop: 0.47,
          rain: 0.15,
          uvi: 9.23,
        },
      ],
      alerts: [
        {
          sender_name:
            'NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)',
          event: 'Small Craft Advisory',
          start: 1684952747,
          end: 1684988747,
          description:
            '...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.',
          tags: [],
        },
      ],
    };
    const mockExpectedRes = {
      data: mockData,

      status: HttpStatusCode.Ok,
    };
    const mockStatus =
      HttpStatusCode.Ok;
    jest
      .spyOn(UtilClass, 'httpCall')
      .mockResolvedValueOnce(
        mockExpectedRes
      );

    await weatherController.handleRequest(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(
      mockResponse.status
    ).toHaveBeenCalledWith(mockStatus);
    expect(
      mockResponse.json
    ).toHaveBeenCalledWith({
      status: mockStatus,
      daily: mockData.daily,
      minutely: mockData.minutely,
      hourly: mockData.hourly,
    });
    expect(
      mockNext
    ).not.toHaveBeenCalled();
  });

  it('should handle error when API response status is not OK', async () => {
    const mockError = new Error(
      'Error in API response'
    );
    const mockStatus =
      HttpStatusCode.InternalServerError;
    jest
      .spyOn(UtilClass, 'httpCall')
      .mockRejectedValueOnce(mockError);

    await weatherController.handleRequest(
      mockRequest,
      mockResponse,
      mockNext
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
