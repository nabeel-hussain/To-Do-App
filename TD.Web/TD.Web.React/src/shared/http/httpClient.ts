import axios, {
   AxiosInstance,
   AxiosResponse,
   Method,
   InternalAxiosRequestConfig,
   AxiosPromise,
} from 'axios';

export interface Request {
    headers?: Record<string, string>;
    data?: any;
    params?: any;
 }
export class HttpClient {
   private readonly httpClient: AxiosInstance;

   constructor() {
      this.httpClient = axios.create({
         baseURL: 'https://jsonplaceholder.typicode.com',
         timeout: 60000,
      });
   }
   private async handleRequest(
    url: string,
    method: Method,
    config: Request = {},
 ): Promise<AxiosResponse<any>> {
    const { headers, data, params } = config;
    const response = await this.httpClient.request({
       url,
       method,
       data,
       params,
       headers,
    });
    return response;
}

public get<T>(url: string, config: Request = {}): AxiosPromise<T> {
  return this.handleRequest(url, 'get', config);
}

public post<T>(url: string, config: Request = {}): AxiosPromise<T> {
  return this.handleRequest(url, 'post', config);
}

public put<T>(url: string, config: Request = {}): AxiosPromise<T> {
  return this.handleRequest(url, 'put', config);
}

public delete<T>(url: string, config: Request = {}): AxiosPromise<T> {
  return this.handleRequest(url, 'delete', config);
}

public patch<T>(url: string, config: Request = {}): AxiosPromise<T> {
  return this.handleRequest(url, 'patch', config);
}
}

export default new HttpClient();