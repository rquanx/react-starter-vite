import Http from ".";
import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { blobReader, fileDownload } from "@services/file-helper";
import { Response, Result } from "./model";

/**
 * 返回2xx响应码
 * @param result
 * @param ret
 */
const fileHandle = async (ret: AxiosResponse<any>) => {
  let result = new Result(ret);
  const disposition = ret.headers["content-disposition"];
  const fileName = disposition?.replace(/^attachment; filename=/, "") ?? "";

  if (ret.status === 200) {
    // 导出格式如果不是blob就是导出没数据
    if (ret.data.type === "application/json") {
      let json = await blobReader(ret.data);
      return Response.success(ret, JSON.parse(json));
    } else {
      fileDownload(ret.data, fileName);
    }
    result.success = true;
    return result;
  } else {
    return Response.success(ret, ret?.data);
  }
};
/**
 * 通过post下载文件
 * @param url
 * @param params
 * @param options
 */
export async function ExportFile(url, params?, config?: AxiosRequestConfig) {
  try {
    let ret = await Axios.post(url, params, {
      responseType: "blob",
      ...config
    });
    return await fileHandle(ret);
  } catch (e) {
    return Response.error(e);
  }
}

/**
 * 通过get请求下载文件
 * @param url
 * @param params
 * @param options
 */
export async function DownloadFile(url, params?, config?: AxiosRequestConfig) {
  try {
    let ret = await Axios.get(url, {
      responseType: "blob",
      params,
      ...config
    });
    return await fileHandle(ret);
  } catch (e) {
    return Response.error(e);
  }
}

export const UploadFile = Http.post;

interface Base64File {
  Name: string;
  Content: string;
  Path: string;
}

export const UploadWithBase64 = (
  url,
  file: Base64File | Base64File[],
  options = {}
) => Http.postExecute(url, file, options);

export default {
  ExportFile,
  DownloadFile,
  UploadFile,
  UploadWithBase64
};
