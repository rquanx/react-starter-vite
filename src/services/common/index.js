/**
 * 获取请求参数返回key-value
 */
export function getSearchParams() {
  //url例子：www.bicycle.com?id="123456"&Name="bicycle"；
  var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
  var object = {};
  if (url.indexOf("?") != -1) {
    //url中存在问号，也就说有参数。
    var str = url.substr(1); //得到?后面的字符串
    var strs = str.split("&"); //将得到的参数分隔成数组[id="123456",Name="bicycle"];
    var len = strs.length;
    for (var i = 0; i < len; i++) {
      object[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  return object;
}

/**
 * 延时加载
 * @param {*} dynamic 动态加载页面
 * @param {number} delay 最小加载时间
 */
export function loadable(dynamic, delay = 300) {
  return Promise.all([
    dynamic,
    new Promise(resolve => setTimeout(resolve, delay))
  ]).then(([moduleExports]) => moduleExports);
}

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export function debounce(fn, ms) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function() {
    let args = arguments;
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}
