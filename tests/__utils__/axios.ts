import { AxiosPromise, AxiosRequestConfig } from "axios";

export function mockAxiosPromise<T>(
  data: T,
  status = 200,
  statusText?: string,
  headers?: any,
  config?: AxiosRequestConfig,
  request?: any
): AxiosPromise<T> {
  return Promise.resolve({
    data,
    status,
    statusText: statusText || "",
    headers: headers || {},
    config: config || {},
    request,
  });
}