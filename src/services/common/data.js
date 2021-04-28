export function checkData(data, value = "") {
  let v = value ? value : "";
  return data ? data : v;
}

/**
 * ie下不支持，通过polyfill可以补全?
 * 
 * @param {*} time 兼容性问题，建议传yyyy/MM/dd的格式
 */
export function dateFormat(time) {
  return time ? new Date(time).format("yyyy-MM-dd HH:mm:ss") : "";
}

/**
 * @param {[]} data
 */
export function hasArrayData(data) {
  return data?.length > 0;
}

export default {
  hasArrayData,
  dateFormat,
  checkData
};
