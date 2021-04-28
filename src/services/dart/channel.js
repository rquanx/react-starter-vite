import { getCircularReplacer } from "./common";
const Key = "__EventMap__";
const Type = {
  Action: "_Action",
  Message: "_Message"
};
let EventId = 0;

window[Key] = new Map();

/**
 * 设置通讯回调函数
 * @param {*} key
 * @param {*} id
 * @param {*} res
 * @param {*} rej
 */
function setCallBack(key, id, res, rej) {
  window[key].set(id, {
    success: message => {
      res(message);
      window[key].delete(id);
    },
    error: message => {
      rej(message);
      window[key].delete(id);
    }
  });
}

/**
 * 向App发送信息
 * @param {*} type channel类型
 * @param {*} key 全局事件存储属性
 * @param {*} id 当前事件的id
 * @param {*} action Action类型
 * @param {*} message 数据
 */
function postMessage(type, key, id, action, message = "") {
  if (window[type] && window[type].postMessage) {
    window[type].postMessage(
      JSON.stringify({
        message:
          typeof message === "string"
            ? message
            : JSON.stringify(message, getCircularReplacer()),
        type: typeof message,
        id,
        key,
        action
      })
    );
  }
}

/**
 * App交互通讯通道
 */
export const Channel = {
  /**
   * 通过特定Action跟App进行交互
   * @param {string} action 操作类型   枚举
   * @param {string | object} message 附带的数据
   */
  Action(action, message = "") {
    return new Promise((res, rej) => {
      let id = EventId++;
      setCallBack(Key, id, res, rej);
      postMessage(Type.Action, Key, id, action, message);
    });
  },
  /**
   * 纯数据交互，可用Action代替
   * @param {*} message
   */
  Message(message) {
    return new Promise((res, rej) => {
      let id = EventId++;
      setCallBack(Key, id, res, rej);
      postMessage(Type.Message, Key, id, "", message);
    });
  }
};

export default Channel;
