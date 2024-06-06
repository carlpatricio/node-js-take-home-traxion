import { GeolocationController } from './controller';
import { WeatherController } from './controller/weather.controller';

export const setUpRoutes = (
  app: any
) => {
  const routes = {
    '/api/geolocation':
      new GeolocationController(),
    '/api/weather':
      new WeatherController(),
  };

  for (const [
    key,
    value,
  ] of Object.entries(routes)) {
    app.use(
      key,
      value.handleRequest.bind(value)
    );
  }
};
