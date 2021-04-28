export class Validator {
  static experssion(exp, message: string = undefined) {
    if (exp && message) {
      throw message;
    }
    return exp;
  }

  static isIE(message: string = undefined) {
    return !!window.ActiveXObject || "ActiveXObject" in window;
  }

  /**
   * 浅比较
   * @param a
   * @param b
   */
  static isShallowEqual(left, right, message: string = undefined) {
    const leftProps = Object.getOwnPropertyNames(left);
    const rightProps = Object.getOwnPropertyNames(right);
    
    if (leftProps.length != rightProps.length) {
      return false;
    }

    for (let i = 0; i < leftProps.length; i++) {
      const key = leftProps[i];
      const leftValue = left[key];
      const rightValue = right[key];
      if (leftValue !== rightValue) {
        return false;
      }
    }
    return true;
  }

  static isNumber(value: string, message: string = undefined) {
    if (value == "") {
      return true;
    } else {
      if (value.match(/^-?[1-9]\d*$/) !== null) {
        return true;
      } else {
        return false;
      }
    }
  }

  static isSpecialCharacters(substring: string, message: string = undefined) {
    let reg = /[~#^$@%&!?%*]/gi;
    return reg.test(substring.trim());
  }
  static isEmojiCharacter(substring: string, message: string = undefined) {
    for (var i = 0; i < substring.length; i++) {
      var hs = substring.charCodeAt(i);
      if (0xd800 <= hs && hs <= 0xdbff) {
        if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            return true;
          }
        }
      } else if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          return true;
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          return true;
        } else if (0x2b05 <= hs && hs <= 0x2b07) {
          return true;
        } else if (0x2934 <= hs && hs <= 0x2935) {
          return true;
        } else if (0x3297 <= hs && hs <= 0x3299) {
          return true;
        } else if (
          hs == 0xa9 ||
          hs == 0xae ||
          hs == 0x303d ||
          hs == 0x3030 ||
          hs == 0x2b55 ||
          hs == 0x2b1c ||
          hs == 0x2b1b ||
          hs == 0x2b50
        ) {
          return true;
        }
      }
    }
  }

  static isObjectNotEmpty(obj, message: string = undefined) {
    return obj && JSON.stringify(obj) !== "{}";
  }

  static isStringNotEmpty(str: string, message: string = undefined) {
    return str?.length > 0;
  }

  static isStringNotEmptyOrWhiteSpace(
    str: string,
    message: string = undefined
  ) {
    return str?.trim?.()?.length > 0;
  }
}

export default Validator;
