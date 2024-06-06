import axios from 'axios';

export class UtilClass {
  public static async httpCall(
    method: string,
    url: string,
    data: any
  ): Promise<any> {
    switch (method.toLowerCase()) {
      case 'get':
        return await axios.get(url, {
          params: data,
        });
      case 'post':
        return await axios.post(
          url,
          data
        );
      default:
        throw new Error(
          '405%%Method Not Allowed'
        );
    }
  }
}
