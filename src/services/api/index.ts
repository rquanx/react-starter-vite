import Axios, { AxiosRequestConfig } from "axios";
import Store from "@services/store";
import { request, get, post, postXML } from "./base";
Axios.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    UserID: Store?.person?.ID ?? 0,
    Account: Store?.person?.Account ?? "",
    "Content-Type": "application/json"
  };

  return config;
});

export class Http {
  static request = request;
  static get = get;

  static post = post;

  static postXML = postXML;
  static async postListQuery(
    path: string,
    params?: any,
    config?: AxiosRequestConfig
  ) {
    const result = await Http.post(path, params, config);
    if (result.success) {
      return result.data;
    }
    result.handleError();
    return [];
  }

  static async postQuery(
    path: string,
    params?: any,
    config?: AxiosRequestConfig
  ) {
    const result = await Http.post(path, params, config);
    if (result.success) {
      return result.data;
    }
    result.handleError();
    return {};
  }

  static async postExecute(
    path: string,
    params?: any,
    config?: AxiosRequestConfig
  ) {
    const result = await Http.post(path, params, config);
    result.handle("执行完成！");
    return result.success;
  }
}

export default Http;
