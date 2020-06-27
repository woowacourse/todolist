import { KEY_TYPE } from '../constants/constants.js';

export const isEnter = event => {
  return event.key && event.key !== KEY_TYPE.ENTER;
}