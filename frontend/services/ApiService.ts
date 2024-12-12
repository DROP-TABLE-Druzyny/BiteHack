import {AxiosInstance, AxiosRequestConfig} from 'axios';

export class ApiService {
    protected axiosInstance: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

  /**
   * Perform a GET request
   * @param endpoint - the API endpoint
   * @param params - Query parameters as key-value pairs
   * @param config - the request configuration
   * @returns Parsed response of type T
   */
  protected async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const respose = await this.axiosInstance.get<T>(endpoint, { ...config, params});
    return this.handleResponse(respose);
  }

  /**
   * Perform a POST request
   * @param endpoint - the API endpoint
   * @param data - the request data
   * @param config - the request configuration
   * @returns Parsed response of type T
   */
  protected async post<T, B>(
    endpoint: string,
    data: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, config);
    return this.handleResponse(response);
  }

  /**
   * Perform a PATCH request
   * @param endpoint - the API endpoint
   * @param data - the request body
   * @param config - the request configuration
   */
  protected async patch<T, B>(
    endpoint: string,
    data: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, config);
    return this.handleResponse(response);
  }

  /**
   * Perform a DELETE request
   * @param endpoint - the API endpoint
   * @param config - the request configuration
   * @returns Parsed response of type T
   * */
  protected async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, config);
    return this.handleResponse(response);
  }

  /**
   * Handle the response
   * @param response - the response to handle
   * @returns Parsed response of type T
   */
  private handleResponse<T>(response: any): T {
    if (response.status >= 200 && response.status < 300) {
      return response.data as T;
    } else {
      throw new Error(`Request failed with status code ${response.status}`, response);
    }
  }
}