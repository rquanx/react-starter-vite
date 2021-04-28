import { message } from "antd";
import { AxiosResponse } from "axios";

export class Response {
  Total: number;
  StatusCode: number;
  Content: any;
  ErrMsg: string;

  static success = (ret: AxiosResponse, content: Response) => {
    let result = new Result(ret);
    if (content?.StatusCode == 200) {
      result.success = true;
      result.data = content?.Content;
    } else if (content?.StatusCode) {
      result.data = content?.Content;
      result.message = content?.ErrMsg;
    } else {
      if (ret.status >= 200 && ret.status < 300) {
        result.success = true;
      } else {
        result.message = "未知错误！";
      }
    }
    return result;
  };

  static error = (e) => {
    let result = new Result(e);
    if (e.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      result.message = e.response.data;
    } else if (e.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      result.message = "网络异常！";
    } else {
      // Something happened in setting up the request that triggered an Error
      result.message = e.message;
    }
    return result;
  };
}
export class Result {
  success: boolean;
  data: any;
  message: string;
  ret: any;

  constructor(
    ret,
    success = false,
    data?: any,
    message?: string
  ) {
    this.ret = ret;
    this.success = success;
    this.data = data;
    this.message = message;
  }
  handle(info?: string,message?: string) {
    this.handleSuccess(info);
    this.handleError(message);
  }

  handleSuccess(info?: string) {
    this.success && message.info(info);
  }
  handleError(error?: string) {
    !this.success && this.message && message.error(error ?? this.message);
  }
}
