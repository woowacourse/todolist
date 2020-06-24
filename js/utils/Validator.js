import { ERROR_MESSAGE } from "./Constracts";

export const validateBlank = (value) => {
  if (value.trim() === "") {
    throw Error(ERROR_MESSAGE.NOT_BLANK);
  }
};
