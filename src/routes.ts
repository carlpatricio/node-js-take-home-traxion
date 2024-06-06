import { query } from 'express-validator';
import { GeolocationController } from './controller';
import { WeatherController } from './controller/weather.controller';
import { ValidatEMiddleware } from './middlewares';

export const setUpRoutes = (
  app: any
) => {
  const routes = {
    '/api/geolocation': {
      validationRules: [
        query('cityName')
          .notEmpty()
          .withMessage(
            'City Name is required'
          ),
        query('countryCode')
          .notEmpty()
          .withMessage(
            'Country Code is required'
          ),
      ],
      controller:
        new GeolocationController(),
    },
    '/api/weather': {
      validationRules: [
        query('latitude')
          .notEmpty()
          .withMessage(
            'Latitude is required'
          ),
        query('longtitude')
          .notEmpty()
          .withMessage(
            'Longtitude is required'
          ),
      ],
      controller:
        new WeatherController(),
    },
  };

  for (const [
    key,
    value,
  ] of Object.entries(routes)) {
    app.use(
      key,
      value.validationRules,
      ValidatEMiddleware.validate,
      value.controller.handleRequest.bind(
        value.controller
      )
    );
  }
};
