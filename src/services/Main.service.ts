import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class MainService {
  protected url: string;
  protected options: AxiosRequestConfig;

  constructor(url: string) {
    this.url = this.sanitizeUrl(url);
    this.options = this.addOptions();
  }

  private sanitizeUrl(url: string): string {
    return `${process.env.BASE_APP_API_URL}/${url}`;
  }

  private addOptions(params?: any): AxiosRequestConfig {
    return {
      headers: {
        Accept: "application/json",
      },
      params,
    };
  }

  protected async get<T = any>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    const response = await axios.get<T>(`${this.url}${endpoint}`, {
      ...this.options,
      params,
    });
    return response.data;
  }

  protected async post<T = any>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const response = await axios.post<T>(
      `${this.url}${endpoint}`,
      data,
      headers ? { ...this.options, headers } : this.options
    );
    return response.data;
  }
}
