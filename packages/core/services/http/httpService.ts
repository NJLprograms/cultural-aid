import { Http } from '@cultural-aid/types/http';

export class HttpService {
  static async get<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return fetch(path, {
      ...meta,
      method: Http.Methods.GET,
      headers: { ...meta.headers, 'Content-Type': 'application/json' },
    }).then((response: Response) => response.json() as Promise<T>);
  }

  static async post<T = any>(
    path: RequestInfo,
    meta?: RequestInit
  ): Promise<T> {
    return fetch(path, {
      ...meta,
      method: Http.Methods.POST,
      headers: { ...meta.headers, 'Content-Type': 'application/json' },
    }).then((response: Response) => response.json() as Promise<T>);
  }

  static async put<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return fetch(path, {
      ...meta,
      method: Http.Methods.PUT,
      headers: { ...meta.headers, 'Content-Type': 'application/json' },
    }).then((response: Response) => response.json() as Promise<T>);
  }

  static async delete<T = any>(
    path: RequestInfo,
    meta?: RequestInit
  ): Promise<T> {
    return fetch(path, {
      ...meta,
      method: Http.Methods.DELETE,
      headers: { ...meta.headers, 'Content-Type': 'application/json' },
    }).then((response: Response) => response.json() as Promise<T>);
  }

  static async patch<T = any>(
    path: RequestInfo,
    meta?: RequestInit
  ): Promise<T> {
    return fetch(path, {
      ...meta,
      method: Http.Methods.PATCH,
      headers: { ...meta.headers, 'Content-Type': 'application/json' },
    }).then((response: Response) => response.json() as Promise<T>);
  }

  static async head<T = any>(
    path: RequestInfo,
    meta?: RequestInit
  ): Promise<T> {
    return fetch(path, {
      ...meta,
      method: Http.Methods.HEAD,
      headers: { ...meta.headers, 'Content-Type': 'application/json' },
    }).then((response: Response) => response.json() as Promise<T>);
  }

  static async options<T = any>(
    path: RequestInfo,
    meta?: RequestInit
  ): Promise<T> {
    return fetch(path, {
      ...meta,
      method: Http.Methods.OPTIONS,
      headers: { ...meta.headers, 'Content-Type': 'application/json' },
    }).then((response: Response) => response.json() as Promise<T>);
  }

  static async connect<T = any>(
    path: RequestInfo,
    meta?: RequestInit
  ): Promise<T> {
    return fetch(path, {
      ...meta,
      method: Http.Methods.CONNECT,
      headers: { ...meta.headers, 'Content-Type': 'application/json' },
    }).then((response: Response) => response.json() as Promise<T>);
  }
}
