import { EVENT_TYPE, KEY_CODE } from "../utils/Constracts.js";
import { validateBlank } from "../utils/Validator.js";

export class TodoInput {
  constructor(onAdd) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener(EVENT_TYPE.KEY_DOWN, (event) => {
      this.onInputHandler(event, onAdd);
    });
  }

  onInputHandler(event, onAdd) {
    if (event.code !== KEY_CODE.ENTER) {
      return;
    }
    try {
      validateBlank(event.target.value);
      onAdd(event.target.value);
      this.$todoInput.value = "";
    } catch (e) {
      alert(e.message);
    }
  }
}
