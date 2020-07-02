import { ERROR_MESSAGE, KEY_TYPE } from '../../utils/constants.js';

export class TodoInput {
  constructor({ onAdd }) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener("keydown", event => this.addTodoItem(event));
    this.onAdd = onAdd;
  }

  isValid(event, value) {
    if (event.key && event.key !== KEY_TYPE.ENTER) {
      return false;
    }
    if (!value) {
      alert(ERROR_MESSAGE.EMPTY)
      return false;
    }
    return true;
  }

  addTodoItem(event) {
    const $newTodoTarget = event.target;

    if (this.isValid(event, $newTodoTarget.value)) {
      this.onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}