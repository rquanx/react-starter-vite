const parse = JSON.parse;
export const overrideParse = () => {
  JSON.parse = (...args) => {
    if (typeof args[0] == "string") {
      try {
        return parse(...args);
      } catch (e) {
        console.log("原生json parse失败!", e);
        return specialCharactersHandle(...args);
      }
    }
    return parse(...args);
  };
};
// 对换行的字符串进行处理
function specialCharactersHandle(...args) {
  let str = args[0];
  try {
    args[0] = str.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
    return parse(...args);
  } catch (error) {
    console.log("二次json parse失败!", error);
    try {
      args[0] = str
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");
      return parse(...args);
    } catch (e) {
      console.log("三次json parse失败!", e);
      throw "json 转换失败!";
    }
  }
}


// stringify防止循环引用
const getCircularReplacer = () => {
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
  

export default overrideParse;
