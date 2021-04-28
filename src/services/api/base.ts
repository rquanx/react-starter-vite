import Axios, { AxiosRequestConfig } from "axios";
import { Response } from "./model";
import { RequestType } from "./enum";
export const request = async (
  type: RequestType,
  path: string,
  params?: any,
  config?: AxiosRequestConfig
) => {
  try {
    let ret = await (type === RequestType.get
      ? Axios.get(path, {
          params,
          ...config
        })
      : Axios.post(path, params, { ...config }));
    return Response.success(ret, ret?.data);
  } catch (error) {
    return Response.error(error);
  }
};

export const get = async (
  path: string,
  params?: any,
  config?: AxiosRequestConfig
) => {
  try {
    let ret = await Axios.get(path, {
      params,
      ...config
    });
    return Response.success(ret, ret?.data);
  } catch (error) {
    return Response.error(error);
  }
};

export const post = async (
  path: string,
  params?: any,
  config?: AxiosRequestConfig
) => {
  try {
    let ret = await Axios.post(path, params, {
      ...config
    });
    return Response.success(ret, ret?.data);
  } catch (error) {
    return Response.error(error);
  }
};

export const postXML = async (
  path: string,
  params?: any,
  config?: AxiosRequestConfig
) => {
  try {
    const headers = {
      ...(config?.headers ?? {}),
      "X-Requested-With": "XMLHttpRequest"
    };
    let ret = await Axios.post(path, params, {
      ...config,
      headers
    });
    //创建文档对象
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(ret?.data, "text/xml");
    //提取数据
    const data = JSON.parse(
      xmlDoc.getElementsByTagName("GetMainLibraryFilesResult")?.[0]?.textContent
    );
    return Response.success(ret, data);
  } catch (error) {
    return Response.error(error);
  }
};
