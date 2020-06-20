import {KEY_TYPE} from "./constans.js";

export const Validator = class {
  static isEnter(event) {
    return event.key === KEY_TYPE.ENTER;
  }

  static isESC(event) {
    return event.key === KEY_TYPE.ESC;
  }
}