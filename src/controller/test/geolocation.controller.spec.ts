import { HttpStatusCode } from 'axios';
import { UtilClass } from '../../common';
import { GeolocationController } from '../geolocation.controller';

describe(
  GeolocationController.name,
  () => {
    let geolocationController: GeolocationController;

    beforeEach(() => {
      geolocationController =
        new GeolocationController();
    });

    describe('handleRequest', () => {
      it('should handle the request and send the response', async () => {
        // Mock the necessary dependencies
        const req: any = {
          query: {
            cityName: 'New York',
            stateCode: 'NY',
            countryCode: 'US',
            limit: 5,
          },
        };
        const res = {
          status: jest
            .fn()
            .mockReturnThis(),
          json: jest.fn(),
        } as any;
        const next = jest.fn();
        jest
          .spyOn(UtilClass, 'httpCall')
          .mockResolvedValueOnce({
            data: [
              {
                name: 'New York',
                lat: 40.7128,
                lon: -74.006,
                country:
                  'United States',
              },
            ],
            status: HttpStatusCode.Ok,
          });
        // Call the handleRequest method
        await geolocationController.handleRequest(
          req,
          res,
          next
        );

        // Assert the expected behavior
        expect(
          res.status
        ).toHaveBeenCalledWith(
          HttpStatusCode.Ok
        );
        expect(
          res.json
        ).toHaveBeenCalled();
        expect(
          next
        ).not.toHaveBeenCalled();
      });
    });
  }
);
