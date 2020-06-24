import { ERROR_MESSAGE } from "./Constracts.js";

export const validateBlank = (value) => {
  if (value.trim() === "") {
    throw Error(ERROR_MESSAGE.NOT_BLANK);
  }
};

export const validateHasClass = (tag, value) => {
  return tag.classList.contains(value);
};
