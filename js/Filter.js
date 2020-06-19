import {FILTER_TYPE} from "./utils.js";

export default (allItem, filterState) => {
  if (filterState === FILTER_TYPE.ALL) {
    return allItem;
  } else if (filterState === FILTER_TYPE.COMPLETED) {
    return allItem.filter(item => item.completed);
  }
  return allItem.filter(item => !item.completed);
}
