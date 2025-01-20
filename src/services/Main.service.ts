import axios, { AxiosRequestConfig } from "axios";

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

  private addOptions(params?: Record<string, any>): AxiosRequestConfig {
    return {
      headers: {
        Accept: "application/json", // Cabecera por defecto
      },
      params,
    };
  }

  private getContentType(headers?: Record<string, string>) {
    // Si se pasa FormData, Axios se encarga automáticamente de asignar la cabecera 'Content-Type'.
    if (headers && headers['Content-Type'] === 'multipart/form-data') {
      return 'multipart/form-data';
    }

    // Si no se pasa Content-Type, se usa application/json por defecto
    return 'application/json';
  }

  protected async get<T = unknown>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    const response = await axios.get<T>(`${this.url}${endpoint}`, {
      ...this.options,
      params,
    });
    return response.data;
  }

  protected async post<T = unknown>(
    endpoint: string,
    data?: Record<string, any> | FormData, // Soporta tanto datos JSON como FormData
    headers?: Record<string, string>
  ): Promise<T> {
    // Verifica el tipo de contenido, si no se pasa 'Content-Type', lo define según el tipo de datos.
    const contentType = this.getContentType(headers);

    const response = await axios.post<T>(
      `${this.url}${endpoint}`,
      data,
      {
        ...this.options,
        headers: {
          ...this.options.headers,
          'Content-Type': contentType,
          ...headers,  // Si se pasa cabecera personalizada, se combinará
        },
      }
    );
    return response.data;
  }

  protected async put<T = unknown>(
    endpoint: string,
    data?: Record<string, any> | FormData, // Soporta tanto datos JSON como FormData
    headers?: Record<string, string>
  ): Promise<T> {
    // Verifica el tipo de contenido, si no se pasa 'Content-Type', lo define según el tipo de datos.
    const contentType = this.getContentType(headers);

    const response = await axios.put<T>(
      `${this.url}${endpoint}`,
      data,
      {
        ...this.options,
        headers: {
          ...this.options.headers,
          'Content-Type': contentType,
          ...headers,  // Si se pasa cabecera personalizada, se combinará
        },
      }
    );
    return response.data;
  }
}