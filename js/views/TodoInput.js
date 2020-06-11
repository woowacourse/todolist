import { ERROR_MESSAGE, EVENT_TYPE, KEY_CODE } from "../utils/Constracts.js";

export class TodoInput {
  constructor(onAdd) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener(EVENT_TYPE.KEY_DOWN, (event) => {
      this.onInputHandler(event, onAdd);
    });
  }

  validate(value) {
    if (value.trim() === "") {
      throw Error(ERROR_MESSAGE.NOT_BLANK);
    }
  }

  onInputHandler(event, onAdd) {
    if (event.code !== KEY_CODE.ENTER) {
      return;
    }
    try {
      this.validate(event.target.value);
      onAdd(event.target.value);
      this.$todoInput.value = "";
    } catch (e) {
      alert(e.message);
    }
  }
}
